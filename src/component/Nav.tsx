import {Menu, MenuItem} from "./dropdown/Dropdown.tsx";
import {Link} from "react-router-dom";
import * as Accordion from '@radix-ui/react-accordion';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose} from "./Sheet.tsx";

const Nav = ({data}: any) => {
    return (
        <Sheet>
            <div className="">
                <div className="">
                    <nav className="container mx-auto flex items-center justify-between flex-wrap py-6">
                        <div className="flex items-center flex-shrink-0 mr-6">
                            <Link to='/'>
                                <svg height="35" viewBox="0 0 13 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.5" cy="7.5" r="5" stroke="black"/>
                                    <circle cx="5.5" cy="5.5" r="5.25" stroke="black" stroke-width="0.5"/>
                                </svg>

                            </Link>
                            <span
                                className="ms-2 text-xl leading-none tracking-tight font-semibold">Memecoin Hero<br/>
                                <span className="text-[.75rem]">Der Krypto-Meme-Blog</span></span><br/>
                        </div>
                        <div
                            className="hidden md:hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            {data.map((item: any) => (
                                <div key={item.id}>
                                    {item.submenu.length > 0 ? (
                                        <Menu
                                            className={'mr-4'}
                                            label={item.title}
                                        >
                                            {item.submenu.map((subItem: any) => (
                                                <div key={subItem.id} className="max-w-[350px] min-w-[250px]">
                                                    <div className="row m-0">
                                                        <div className="p-0 col-12">
                                                            <Link
                                                                to={{pathname: item.ctaLink}}>
                                                                <MenuItem
                                                                    className="flex justify-center focus:shadow-[0_0_0_2px]"
                                                                    style={item.ctaBackgroundImage ? {backgroundImage: `url('https://headless.mapztour.de${item.ctaBackgroundImage.data?.attributes?.url}')`} : {}}
                                                                >
                                                                    {item.ctaText && (

                                                                        <div
                                                                            className="my-5 text-[18px] font-medium">
                                                                            {item.ctaSVG && item.ctaSVG.data && (
                                                                                <img width="100" alt=""
                                                                                     src={'https://headless.mapztour.de' + item.ctaSVG.data.attributes.url}/>)}
                                                                            {item.ctaText && (
                                                                                <h6 className="">{item.ctaText}</h6>)}
                                                                        </div>
                                                                    )}
                                                                </MenuItem>
                                                            </Link>

                                                        </div>
                                                    </div>
                                                    <Link
                                                        key={subItem.id}
                                                        to={{pathname: subItem.link}}
                                                        state={subItem}>
                                                        <MenuItem key={subItem.id} label={subItem.title}/>
                                                    </Link>
                                                </div>
                                            ))}
                                        </Menu>
                                    ) : (
                                        <>
                                            {!item.hidden && <Link key={item.id}
                                                                   className="block lg:inline-block lg:mt-0 mr-4"
                                                                   to={{pathname: item.link}}
                                                                   state={item}>{item.title}</Link>}

                                        </>

                                    )}
                                </div>
                            ))}
                        </div>
                        <SheetTrigger>
                            <div className="block lg:hidden">
                                <button
                                    className="flex items-center px-3 py-2 border rounded text-black border-black hover:border-indigo-50">
                                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                                    </svg>
                                </button>
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                    <div
                                        className="lg:hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                                        <div className="text-sm lg:flex-grow">
                                            <>
                                                {data.map((item: any) => (
                                                    item.submenu.length > 0 ? (
                                                        <Accordion.Root key={item.id}
                                                                        className="w-100"
                                                                        type="single" collapsible>
                                                            {item.submenu.map((subItem: any) => (
                                                                <Accordion.Item key={item.id} value={'item-' + item.id}
                                                                                className=" overflow-hidden first:mt-0">
                                                                    <Accordion.Header className="flex">
                                                                        <div
                                                                            className="w-full">
                                                                            <Accordion.Trigger
                                                                                className="w-full cursor-pointer font-normal flex h-[44px] flex-1 items-center justify-between text-[14px] leading-none outline-none">
                                                                                {item.title}
                                                                                <ChevronDownIcon
                                                                                    className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                                                                                    aria-hidden/>
                                                                            </Accordion.Trigger>
                                                                        </div>
                                                                    </Accordion.Header>
                                                                    <Accordion.Content
                                                                        className="bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
                                                                        {item.ctaText && (
                                                                            <Link
                                                                                to={{pathname: item.ctaLink}}
                                                                            >
                                                                                <SheetClose>
                                                                                    <div
                                                                                        className="">
                                                                                        {item.ctaText && (
                                                                                            <div
                                                                                                className="flex relative h-[20vh]">
                                                                                                <h6 className="text-white text-[22px] font-medium flex items-center justify-center absolute left-0 right-0 top-0 bottom-0 z-1">{item.ctaText}</h6>
                                                                                                <img
                                                                                                    src={import.meta.env.VITE_STRAPI_API_URL + item.ctaBackgroundImage.data?.attributes?.url}
                                                                                                    className="w-full h-100 object-cover"
                                                                                                    alt="..."/>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </SheetClose>
                                                                            </Link>

                                                                        )}
                                                                        <div className="py-[15px] flex w-full px-5">
                                                                            <Link key={subItem.id}
                                                                                  className=""
                                                                                  to={{pathname: subItem.link}}
                                                                                  state={item}>
                                                                                <SheetClose>
                                                                                    {subItem.title}
                                                                                </SheetClose>
                                                                            </Link>
                                                                        </div>
                                                                    </Accordion.Content>
                                                                </Accordion.Item>
                                                            ))}
                                                        </Accordion.Root>
                                                    ) : (
                                                        <>
                                                            {!item.hidden && <div className="">
                                                                <Link key={item.id} className="h-[44px] flex"
                                                                      to={{pathname: item.link}}
                                                                      state={item}>
                                                                    <SheetClose>
                                                                        {item.title}
                                                                    </SheetClose>
                                                                </Link>
                                                            </div>}
                                                        </>
                                                    )
                                                ))}
                                            </>
                                        </div>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </nav>
                </div>
            </div>
        </Sheet>
    )
}

export default Nav;