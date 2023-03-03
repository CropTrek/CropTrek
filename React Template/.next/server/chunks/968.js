"use strict";
exports.id = 968;
exports.ids = [968];
exports.modules = {

/***/ 5968:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ak": () => (/* binding */ logoSlider),
/* harmony export */   "C5": () => (/* binding */ heroSliderTwo),
/* harmony export */   "Ys": () => (/* binding */ testimonialSliderFive),
/* harmony export */   "cK": () => (/* binding */ projectsSliderOne),
/* harmony export */   "cg": () => (/* binding */ heroSliderOne),
/* harmony export */   "hS": () => (/* binding */ projectsSliderThree),
/* harmony export */   "iM": () => (/* binding */ recentProductSlider),
/* harmony export */   "kH": () => (/* binding */ testimonialSliderOne),
/* harmony export */   "m4": () => (/* binding */ testimonialSliderThree),
/* harmony export */   "pI": () => (/* binding */ serviceSliderOne),
/* harmony export */   "pP": () => (/* binding */ testimonialSliderTwo),
/* harmony export */   "v6": () => (/* binding */ projectsSliderTwo)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


const Arrow = ({ arrowCls , onClick , icon  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: arrowCls,
        onClick: onClick,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
            className: icon
        })
    });
};
const heroSliderOne = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    fade: true,
    autoplay: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "prev slick-arrow",
        icon: "far fa-arrow-left"
    }),
    nextArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "next slick-arrow",
        icon: "far fa-arrow-right"
    }),
    responsive: [
        {
            breakpoint: 767,
            settings: {
                arrows: false
            }
        }, 
    ],
    beforeChange: (current, next)=>{
        const sliders = document.querySelectorAll("div.single-slider");
        for(let i = 0; i < sliders.length; i++){
            const element = sliders[i];
            element.setAttribute(`data-slick-index`, next);
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .doAnimations */ .d3)(element);
        }
    }
};
const projectsSliderOne = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "prev slick-arrow",
        icon: "far fa-arrow-left"
    }),
    nextArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "next slick-arrow",
        icon: "far fa-arrow-right"
    }),
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }, 
    ]
};
const testimonialSliderOne = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "prev slick-arrow",
        icon: "far fa-arrow-left"
    }),
    nextArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "next slick-arrow",
        icon: "far fa-arrow-right"
    }),
    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1200,
            settings: {
                arrows: false,
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                arrows: false,
                slidesToShow: 1
            }
        }, 
    ]
};
const logoSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                arrows: false,
                slidesToShow: 4
            }
        },
        {
            breakpoint: 991,
            settings: {
                arrows: false,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 767,
            settings: {
                arrows: false,
                slidesToShow: 1
            }
        }, 
    ]
};
const recentProductSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }, 
    ]
};
const testimonialSliderTwo = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
};
const heroSliderTwo = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    fade: true,
    autoplay: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                arrows: false,
                dots: false
            }
        }, 
    ],
    appendDots: (dots)=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "hero-dots",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                children: dots.map((item, index)=>{
                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        children: item.props.children
                    }, index);
                })
            })
        });
    }
};
const projectsSliderThree = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }, 
    ]
};
const testimonialSliderFive = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const projectsSliderTwo = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }, 
    ]
};
const serviceSliderOne = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "prev slick-arrow",
        icon: "far fa-arrow-left"
    }),
    nextArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "next slick-arrow",
        icon: "far fa-arrow-right"
    }),
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                arrows: false,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1200,
            settings: {
                arrows: false,
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                arrows: false,
                slidesToShow: 1
            }
        }, 
    ]
};
const testimonialSliderThree = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "prev slick-arrow",
        icon: "far fa-arrow-left"
    }),
    nextArrow: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
        arrowCls: "next slick-arrow",
        icon: "far fa-arrow-right"
    }),
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1200,
            settings: {
                arrows: false,
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                arrows: false,
                slidesToShow: 1
            }
        }, 
    ]
};


/***/ })

};
;