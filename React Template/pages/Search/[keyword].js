import Products from "../Products";
import {useRouter} from "next/router";
import CartPage from "../Cart/[id]";
import Header from "../../src/layouts/Header";
import React from "react";

const SearchPage = () => {
    const router=useRouter()
    const keyword=router.query.keyword;
    return(
        <>

            <link
                rel="shortcut icon"
                href="assets/images/favicon.ico"
                type="image/png"
            />
            {/*====== FontAwesome css ======*/}
            <link
                rel="stylesheet"
                href="../../../../assets/fonts/fontawesome/css/all.min.css"
            />
            {/*====== Flaticon css ======*/}
            <link rel="stylesheet" href="../../../../assets/fonts/flaticon/flaticon.css" />
            {/*====== Bootstrap css ======*/}
            <link
                rel="stylesheet"
                href="../../../../assets/vendor/bootstrap/css/bootstrap.min.css"
            />
            {/*====== magnific-popup css ======*/}
            <link
                rel="stylesheet"
                href="../../../../assets/vendor/magnific-popup/dist/magnific-popup.css"
            />
            {/*====== Slick-popup css ======*/}
            <link rel="stylesheet" href="../../../../assets/vendor/slick/slick.css" />
            {/*====== Nice Select css ======*/}
            <link
                rel="stylesheet"
                href="../../../../assets/vendor/nice-select/css/nice-select.css"
            />
            {/*====== Animate css ======*/}
            <link rel="stylesheet" href="../../../../assets/vendor/animate.css" />
            {/*====== Default css ======*/}
            <link rel="stylesheet" href="../../../../assets/css/default.css" />
            {/*====== Style css ======*/}
            <link rel="stylesheet" href="../../../../assets/css/style.css" />

        <Products keyword={keyword} />
        </>
    )
}
export default SearchPage;
