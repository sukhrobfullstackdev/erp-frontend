import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import Title from "../../components/elements/title";
import Progressbar from "../../components/progressbar";
import Text from "../../components/elements/text";
import authBgImg from "../../assets/images/auth-left-image-full.png";
import logo from "../../assets/images/dark-logo.svg";
import Toastify from "../../components/toastify";

const StyledAuthLayout = styled.div`
  display: flex;
  height: 100vh;

  .auth {
    &__left {
      width: 49.5%;
      overflow: hidden;
      position: relative;

      &__img {
        background-image: url(${authBgImg});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center/cover;
        width: 100%;
        height: 100%;
      }

      &__bottom {
        position: absolute;
        bottom: 80px;
        text-align: center;
        width: 80%;
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
      }

      &__title {
        margin-bottom: 24px;
        font-weight: 600;
        font-size: 36px;
        line-height: 54px;
      }

      &__text {
        margin-top: 6px;
        font-weight: normal;
        font-size: 20px;
        line-height: 30px;
        color: #e4d7cf;
      }

      &__progressbar {
        width: 340px;
        margin: 0 auto;
        height: 4px;
        margin-top: 40px;

        .rc-progress-line {
          width: 100%;
          height: 100%;
        }

        .rc-progress-line-path {
          transition: 10s ease-in-out !important;
        }
      }
    }

    &__right {
      width: 50.5%;
      padding: 60px;
      position: relative;

      .logo {
        position: absolute;
        cursor: pointer;
        top: 60px;
        left: 60px;
      }

      .text-center {
        margin-top: 10px;
      }

      &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -48%);
        width: 400px;

        .from-label {
          margin-bottom: 14px;
        }

        .backButton,
        .nextButton {
          a,
          button {
            padding-top: 16px;
            padding-bottom: 16px;
            width: 190px;
            height: 50px;
          }
        }

        .backButton {
          button {
            &:hover {
              color: #353945;

              .icon {
                background-color: #353945 !important;
              }
            }
          }
        }

        .SendAgainButton {
          a,
          button {
            width: 215px;
            height: 50px;
          }
        }
      }
    }
  }

  .swiper-slide-active,
  .swiper-slide-duplicate-active {
    .auth {
      &__left {
        &__progressbar {
          .rc-progress-line {
            .rc-progress-line-path {
              stroke-dasharray: 110px, 100px !important;
            }
          }
        }
      }
    }
  }

  .forgot-password {
    margin-top: 20px;

    button {
      width: 400px;
      height: 50px;
    }
  }

  @media (max-width: 550px) {
    display: block;
    .auth {
      &__left {
        display: none;
      }

      &__right {
        width: 100%;
        height: 100vh;
        padding: 90px 4% 4%;

        .logo {
          top: 20px;
          left: 20px;
        }

        &__content {
          width: auto;
          position: unset;
          transform: none;

          .backButton,
          .nextButton {
            a,
            button {
              width: 180px;
              height: 47px;
            }
          }
          .SendAgainButton {
            button {
              width: 180px;
              height: 46px;
              font-size: 16px;
            }
          }
        }
      }
    }

    .form-error-message {
      position: absolute;
      top: 28px;
      left: -27%;
    }

    .forgot-password {
      margin-bottom: 32px;
      margin-top: 32px;
    }
  }
  @media (max-width: 400px) {
    .auth {
      &__right {
        &__content {
          .backAndNextBtnContainer {
            justify-content: space-around;
          }

          .backButton,
          .nextButton {
            a,
            button {
              width: 150px;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
`;
const AuthLayout = ({ children, ...props }) => {
  SwiperCore.use([Autoplay]);
  return (
    <StyledAuthLayout {...props}>
      <Toastify />
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        className="auth__left"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={3000}
        loop={true}
      >
        <SwiperSlide data-swiper-autoplay="5000">
          <div className="auth__left__img">
            <div className="auth__left__bottom">
              <Title light lg semiBold className={"auth__left__title"}>
                Jonny Wick
              </Title>
              <Text lg light>
                Product Designer
              </Text>
              <Text lg className={"auth__left__text"}>
                Work experience 8 years
              </Text>
              <Progressbar percent={0} strokeWidth={2} trailWidth={2} className={"auth__left__progressbar"} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide data-swiper-autoplay="5000">
          <div className="auth__left__img">
            <div className="auth__left__bottom">
              <Title light lg semiBold className={"auth__left__title"}>
                Jonny Wick
              </Title>
              <Text lg light>
                Product Designer
              </Text>
              <Text lg className={"auth__left__text"}>
                Work experience 8 years
              </Text>
              <Progressbar percent={0} strokeWidth={2} trailWidth={2} className={"auth__left__progressbar"} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="auth__right" style={{ backgroundColor: "#fff" }}>
        <img className={"logo"} src={logo} alt="logo" />
        <div className="auth__right__content">{children}</div>
      </div>
    </StyledAuthLayout>
  );
};

export default AuthLayout;
