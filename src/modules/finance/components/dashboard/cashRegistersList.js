import { memo, useState } from "react";
import { isArray, get } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames";
import { Pagination, Navigation } from "swiper";

import CardCashRegisters from "./cardCashRegisters";

const CashRegistersList = ({ data = [] }) => {
  const [state, setState] = useState({
    nextButtonDisabled: false,
  });

  return (
    <>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
          el: null,
        }}
        initialSlide={0}
        slidesPerView={1}
        spaceBetween={data.length === 1 ? 0 : 24}
        modules={[Pagination, Navigation]}
        navigation={true}
        // grabCursor={true}
        className={classNames("mySwiper", {
          nextButtonDisabled: state.nextButtonDisabled,
        })}
        // allowSlideNext={false}
        allowTouchMove={false}
        onActiveIndexChange={(e) => {
          if (data.length === (get(e, "activeIndex") + 1) * 3) setState((s) => ({ ...s, nextButtonDisabled: true }));
          else if (data.length > (get(e, "activeIndex") + 1) * 3) setState((s) => ({ ...s, nextButtonDisabled: false }));
          else if (data.length < (get(e, "activeIndex") + 1) * 3) setState((s) => ({ ...s, nextButtonDisabled: true }));
        }}
      >
        {isArray(data) &&
          data.map((item, index) => (
            <SwiperSlide key={get(item, "cashId", index)}>
              <CardCashRegisters
                {...{
                  className: "cashRegisterss",
                  ...item,
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default memo(CashRegistersList);
