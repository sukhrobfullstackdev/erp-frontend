import React from "react";
import { createGlobalStyle } from "styled-components";
// import 'rsuite/dist/rsuite.min.css';
// import "react-datepicker/dist/react-datepicker.css";
import "react-tabs/style/react-tabs.css";
import "assets/css/style.css";
import "assets/css/colors.css";
import "assets/css/icons.css";
import "assets/css/sizes.css";
import "rc-checkbox/assets/index.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "swiper/css";
import "swiper/css/autoplay";
import "./../containers/Form/components/date-picker/datePicker.css";
import "../modules/academy/components/searchSelect.css";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px #FCFCFD inset;
      box-shadow: 0 0 0 30px #FCFCFD inset;
      border-radius: 10px;
  }
  h1, h2, h3, h4, h5, h6, p, ul {
    margin: 0;
    padding: 0;
  }

  body {
    font-weight: 400;
    font-size: 16px;
    color: #353945;
    background: #F7F7FA;
    //background: #cccccccc;
    line-height: 1.5;
    font-family: 'Poppins', sans-serif;
  }

  .w-0{
    width: 0% !important;
  }
  .w-25{
    width: 20% !important;
  }
  .w-50{
    width: 50% !important;
  }
  .w-75{
    width: 75% !important;
  }
  .w-100{
    width: 100% !important;
  }
  .mh-100{
    min-height: 100% !important;
  }
  .overflow-auto{
    overflow: auto;
  }

  .text {
    &-center {
      text-align: center !important;
    }

    &-right {
      text-align: right !important;
    }

    &-left {
      text-align: left !important;
    }
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .d-none {
    display: none;
  }
  .d-inline-block {
    display: inline-block;
  }
  .d-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .align-center {
    display: flex;
    align-items: center;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  .mb-8{
    margin-bottom: 8px !important;
  }
  .ml-8{
    margin-left: 8px !important;
  }
  .mb-12 {
    margin-bottom: 12px;
  }
  .mb-14 {
    margin-bottom: 14px;
  }
  .mb-15 {
    margin-bottom: 15px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .mb-24{
    margin-bottom: 24px;
  }
  .mb-30{
    margin-bottom: 30px;
  }
  .mb-26{
    margin-bottom: 26px;
  }
 .mb-36{
   margin-bottom: 36px;
 }
 .mb-40{
   margin-bottom: 40px;
 }
 .mb-100{
   margin-bottom: 100px;
 }
 .mr-5{
   margin-right: 5px;
 }
  .mr-20{
    margin-right: 20px;
  }
  .mt-30{
    margin-top: 30px;
  }
  .mt-20{
    margin-top: 20px;
  }
  .mt-24{
    margin-top: 24px;
  }
  .mr-8{
    margin-right: 8px !important;
  }
.semi-bold{
  font-weight: 600 !important;
}
.text-uppercase{
  text-transform: uppercase !important;
}
iframe{
  display: none !important;
}
  .Resizer {
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .Resizer.horizontal:hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .position-relative{
    position: relative !important;
  }
  @media print {
    .no-print, .no-print * {
      display: none !important;
    }
  }

  .grid-body-box {
    min-height: 86vh;
  }
  
  .btn-border-radius-8 {
    button,a {
      border-radius: 8px;
    }
  }
  .btn-border-radius-4 {
    button,a {
      border-radius: 4px;
    }
  }

  .box{
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #E6E8EC;
  }
  .table-border{
    border: 1px solid #d8d9df;
  }
  .shadow{
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  }
  
  @keyframes hideAnim {
    0% {opacity:0.8; transform: scale(0.8);}
    50% {opacity:0.4; transform: scale(0.5);}
    100% {opacity: 0;  transform: scale(0); display: none;}
  }
  @keyframes showAnim {
    0% {opacity:0.4; display: block; transform: scale(0.4);}
    50% {opacity:0.8; display: block; transform: scale(0.8);}
    100% {opacity: 1; display: block; transform: scale(1);}
  }
  /* how does work? animation: hideAnim 0.2s forwards; */

  @keyframes rotate {
    0% {transform: rotate(0deg);}
    //25% {transform: rotate(90deg);}
    //50% {transform: rotate(180deg);}
    //50% {transform: rotate(270deg);}
    100% {transform: rotate(360deg);}
  }
  
  .simplebar-horizontal-only {
  .simplebar-track {
    &.simplebar-vertical {
      display: none !important;
    }
  }
  .simplebar-content-wrapper {
    overflow-y: hidden !important;
  }

  .simplebar-scroll-content {
    padding-right: 0!important;
    overflow-y: hidden;
  }

  .simplebar-content {
    margin-right: 0!important;
  }
}

//  animation: rotate 1s infinite;

.grid-view-header {
  position: sticky;
    top: 0;
    left: 0;
    background: #fff;
}

/* &[data-title] {
          position: relative;
        }
        &[data-title]:hover::after {
          content: attr(data-title);
          position: absolute;
          width: 180px;
          min-height: 35px;
          font-size: 12px;
          bottom: -69%;
          right: 0;
          background-color: #222;
          color: #fff;
          border-radius: 5px;
          padding: 10px;
          z-index: 3;
        }
        &[data-title]:hover::before {
          content: "";
          border-top: 10px solid transparent;
          border-bottom: 10px solid #222;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          position: absolute;
          bottom: -11%;
          right: calc((180px / 2) - 10px);
          z-index: 1;
        } */
        /* [data-title]:hover::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: calc((200px / 2) - 5px);
      width: 15px;
      height: 15px;
      transform: rotate(45deg);
      background-color: #222;
      border-radius: 10%;
      z-index: 1;
    } */
`;
