import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  {
    title: "Dashboard",
    href: "/ui/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Users",
    href: "/User/UsersDash",
    icon: "bi bi-person-fill-gear"
   
   
  },
  {
    title: "Orders Managment",
    href: "/DashAdminManagement/OrdersDash",
    icon: "bi bi-card-text",
  },
  {
    title: "Products Managment",
    href: "/DashAdminManagement/ProductsDash",
    icon: "bi bi-card-text",
  },
  {
    title: "Farms",
    href: "/FarmDash/getFarms",
    icon: "bi bi-tree",
  }, {
    title: "Job Offers",
    href: "/JobDash/jobPosts",
    icon: "bi bi-card-text",
  },

 



  {
    title: "Alert",
    href: "/ui/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Badges",
    href: "/ui/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Buttons",
    href: "/ui/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Cards",
    href: "/ui/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Grid",
    href: "/ui/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Table",
    href: "/ui/tables",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/ui/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Breadcrumbs",
    href: "/ui/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About",
    href: "/ui/aboutDash",
    icon: "bi bi-people",
  }
];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  &emsp;
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                

                </a>
              </Link>


           


            </NavItem>
          ))}
         
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
