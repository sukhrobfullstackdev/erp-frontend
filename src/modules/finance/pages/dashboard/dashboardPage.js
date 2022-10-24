import { memo, useEffect } from "react";
import styled from "styled-components";
import DashboardContainer from "../../containers/dashboard/dashboardContainer";
import { useDispatch } from "react-redux";
import { checkTab } from "utils";
import arrowRight from "../../../../assets/icons/arrow-right-stick.svg";

const Style = styled.div`
  padding: 40px;
  .col {
    padding-right: 12px !important;
    padding-left: 12px !important;
  }
  .row {
    margin-left: -12px !important;
    margin-right: -12px !important;
  }
  .space-for-row {
    margin-top: 24px;
  }
  .cashRegisters {
    margin-bottom: 24px;
  }

  .col-for-swiper {
    padding-right: 4px !important;
    padding-left: 4px !important;
  }
  .swiper {
    max-height: 361px;
    padding: 0 8px;
    &-slide {
      height: auto !important;
    }

    &-button-prev,
    &-button-next {
      width: 80px;
      height: 80px;
      z-index: 2;
      position: absolute;
      right: 90px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      padding-top: 8px;
      background: #f0fef5;
      cursor: pointer;
      &:after {
        content: "";
        display: inline-block;
        width: 25px;
        height: 25px;
        background-color: #45b36b;
        mask-image: url(${arrowRight});
        -webkit-mask-image: url(${arrowRight});
        -webkit-mask-size: cover;
        mask-size: cover;
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        transform: rotate(90deg);
      }
    }
    &-button-prev {
      top: -40px;
      padding-top: 45px;
      &:after {
        transform: rotate(-90deg);
      }
      &.swiper-button-disabled {
        display: none;
      }
    }
    &-button-next {
      bottom: -40px;
    }

    &.nextButtonDisabled {
      .swiper-button-next {
        display: none;
      }
    }
  }

  .refreshIcon {
    width: 32px;
    height: 32px;
    background: #fcfcfd;
    border: 1px solid #f4f5f6;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fcfcfd;
    border: 1px solid #f4f5f6;
    box-sizing: border-box;
    border-radius: 6px;
    width: 71px;
    height: 32px;
    margin: 0 10px;
    padding: 3px;
  }

  .dropDown__button {
    .ui__icon__wrapper {
      &.md {
        width: 32px;
        height: 32px;
        background: #fcfcfd;
        border: 1px solid #f4f5f6;
        box-sizing: border-box;
        border-radius: 6px;

        .icon {
          width: 30px;
        }
      }
    }
  }
  .Expenses {
    margin-top: 0;
  }
  @media (max-width: 1440px) {
    .swiper-button-next {
      right: 40px;
    }
  }
`;

const DashboardPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Dashboard");
  }, []);

  return (
    <Style>
      <DashboardContainer {...rest} />
    </Style>
  );
};

export default memo(DashboardPage);
