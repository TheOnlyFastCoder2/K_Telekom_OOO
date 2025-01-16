import { useEffect, useState, useTransition } from 'react';

import apiFetch  from '@wordpress/api-fetch';
import { ApiFetchPage, ApiFetchMedia, ApiFetchPost } from '@/apiFetch';
import Header from "./landing/Header";
import Hero, { IPropsHero } from "./landing/sections/Hero";
import TariffList, { IPost } from './landing/sections/TariffList';
import Footer, { IContacts } from './landing/Footer';
import { IfElse } from './utils/jsx-control-statements';
import Loader from './components/ui/Loader';


interface IACF {
  logo: string,
  hero: IPropsHero,
  Contacts: IContacts
  tariffList: IPost[]
}

export default function App () {
  const [isPending, startTransition] = useTransition();
  const [ acf, setAcf] = useState<Partial<IACF>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    startTransition( async () => {
      const pages = await apiFetch({ path: '/wp/v2/pages' });
      console.log(pages)
      const [respPage] = await apiFetch<ApiFetchPage<IACF>>({ path: "/wp/v2/pages?slug=home" });
      const respMediaLogo = await apiFetch<ApiFetchMedia>({ path: `/wp/v2/media/${respPage.acf.logo}` })
      const respMedia = await apiFetch<ApiFetchMedia>({ path: `/wp/v2/media/${respPage.acf.hero.image}` })
      const respTariffList =  await apiFetch<ApiFetchPost<IPost>>({ path: `/wp/v2/posts?categories=2` });

      const imagePromises = [
        new Promise((resolve) => {
          const img = new Image();
          img.src = respMediaLogo.source_url;
          img.onload = resolve;
        }),
        new Promise((resolve) => {
          const img = new Image();
          img.src = respMedia.source_url;
          img.onload = resolve;
        }),
      ];

      await Promise.all(imagePromises);

      setAcf({
        logo: respMediaLogo.source_url,
        Contacts: respPage.acf.Contacts,
        tariffList: respTariffList.map(({acf}) => acf),
        hero: {
          ...respPage.acf.hero,
          list: Object.values(respPage.acf.hero.list||{}),
          image: {
            url: respMedia.source_url,
            alt_text: respMedia.alt_text,
          }
        }
      });

      setImagesLoaded(true);
    })
  }, [])

  return (
     <>
      <IfElse
        condition={isPending || !imagesLoaded}
        ifChildren={<Loader/>}
        elseChildren={(
          <>
            <Header/>
            <Hero {...acf.hero}/>
            <TariffList list={acf.tariffList}/>
            <Footer contacts={acf.Contacts} logo={acf.logo}/>
          </>
        )}
      />
     </>
  )
}


