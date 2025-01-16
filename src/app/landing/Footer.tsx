import { For } from "../utils/jsx-control-statements";

export interface IContacts {
  [key: string]: {
    href: string;
    srcimg: string;
  }
}
export interface IPropsContacts {
  logo?: string,
  contacts?: IContacts,
}

export default function Footer ({logo, contacts}: IPropsContacts) {
  return (
    <footer className="Footer">
      <div className="wrapper">
        <img src={logo} alt="logo" className="Footer__logo"/>
        <p className="Footer__text">© 2018–2022 ООО «К-Телеком»</p>
        <ul className="Footer__networks">
          <For items={Object.values(contacts||{})}>
            {({href, srcimg}) => {
              return (
                <li className="Footer__network-item">
                <a href={href} target="_blank" rel="noopener" className="Footer__network-link">
                  <img src={srcimg} alt="" className="Footer__network-icon"/>
                </a>
              </li>
              )
            }}
          </For>
        </ul>
      </div>
    </footer>
  ) 
}

