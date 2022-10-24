import React from "react";
import Modal from "components/elements/modal";
import Flex from "components/elements/flex";
import { numberPrettier } from "utils";
import Field from "containers/Form/field";
import { get, head, isNull } from "lodash";
import Button from "components/elements/button";

import InfoListItem from "./info_list-item";
//date change long to normal time
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

const ModalInvoice = ({
  open,
  setOpen,
  type,
  data,
  active,
  setActive,
  setIds,
  clearFilters,
  invoiceDatafilters,
  setInvoiceDatafilters,
  getFildType,
}) => {
  return (
    <div>
      <Modal width="1400" active={open} onClose={() => setOpen((state) => !state)}>
        <div className="modal-invoice">
          {data ? (
            <>
              <h3 className="mb-12">{type} </h3>
              {data.filters ? (
                <div className="filter__box">
                  {data.filters?.map((v, i) => (
                    <Field
                      key={i}
                      placeholder={v.type !== "DATE" ? v.name : "00"}
                      isMulti={v.type === "LABELS"}
                      options={v.typeConfig?.options}
                      maxShowSelected={1}
                      onChange={(value) => {
                        value &&
                          setInvoiceDatafilters((i) => [
                            ...(i ? i.filter((t) => t.name !== v.name) : []),
                            {
                              name: v.name,
                              value: value,
                              type: v.type,
                            },
                          ]);
                      }}
                      hideLabel
                      labelKey={"name"}
                      valueKey={"id"}
                      defaultValue={isNull(invoiceDatafilters) && ""}
                      className={"filter__fild__item"}
                      name={v.name}
                      type={getFildType(v.type)}
                    />
                  ))}

                  <Button onClick={clearFilters} disabled={!invoiceDatafilters?.length} className="filter__fild_button">
                    Clear
                  </Button>
                </div>
              ) : null}
              <Flex justify="space-evenly" align="center" className="invoice-cards">
                {type === "GROUP" || type === "ADMISSION"
                  ? data.options.map((v, i) => (
                      <div className={`info_list card ${active === v.id && "active"}`} key={i} onClick={() => setActive(v.id)}>
                        {type === "GROUP" ? (
                          <InfoListItem>
                            <p className="key "> name </p>
                            <p className="value gr-name">{v.name}</p>
                          </InfoListItem>
                        ) : null}
                        <InfoListItem>
                          <p className="key">specialization </p>
                          <p className="value">{v.specialization.name}</p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">groupType </p>
                          <p className="value">{v.groupType.name}</p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">Number of students </p>
                          <p className="value">
                            {v.haveStudentCount}/{v.maxStudentCount}
                          </p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">Week, Day </p>
                          <p className="value">
                            {v.weekdays?.map(
                              (item, index) => `${item.substring(0, 2)}${v.weekdays.length - 1 === index ? "" : ","}`
                            )}
                          </p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">Lesson time</p>
                          <p className="value">
                            {new Date(v.lessonStartTime).getHours() +
                              ":" +
                              padTo2Digits(new Date(v.lessonStartTime).getMinutes())}{" "}
                            - {new Date(v.lessonEndTime).getHours() + ":" + padTo2Digits(new Date(v.lessonEndTime).getMinutes())}
                          </p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">Price</p>
                          <p className="value price">{v.price ? numberPrettier(v.price) + " UZS" : null}</p>
                        </InfoListItem>
                        {type === "ADMISSION" ? (
                          <>
                            {" "}
                            <InfoListItem>
                              <p className="key "> start date </p>
                              <p className="value gr-name">{new Date(v.startDate).toLocaleDateString()}</p>
                            </InfoListItem>
                            <InfoListItem>
                              <p className="key "> end date </p>
                              <p className="value gr-name">{new Date(v.endDate).toLocaleDateString()}</p>
                            </InfoListItem>
                          </>
                        ) : null}
                        {active === v.id && (
                          <InfoListItem>
                            <p className="key ">Timetable </p>
                            <p className="value w-50">
                              <div className="w-100">
                                {/* {console.log(v.timeTableLabel?.options)} */}
                                <Field
                                  type={"custom-select"}
                                  valueKey={"id"}
                                  labelKey={"name"}
                                  // name={head(get(v, "values", []))}
                                  name={"ids"}
                                  action={get(v, "timeTableLabel.action", {})}
                                  options={get(v, "timeTableLabel.options", [])}
                                  onChange={(e) => setIds(e)}
                                  isMulti
                                  hideLabel
                                  maxShowSelected={1}
                                  disabled={active !== v.id ? true : false}
                                  isFixed
                                  defaultValue={isNull(get(v, "timeTableLabel.values")) ? [] : get(v, "timeTableLabel.values")}
                                />
                              </div>
                            </p>
                          </InfoListItem>
                        )}
                      </div>
                    ))
                  : data.options.map((v, i) => (
                      <div className={`info_list card ${active === v.id && "active"}`} key={i} onClick={() => setActive(v.id)}>
                        <InfoListItem>
                          <p className="key ">Title </p>
                          <p className="value gr-name">{v.title}</p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">speakers </p>
                          <p className="value">
                            {v.speakers.slice(0, 2).map((v, i) => (
                              <>
                                {v.fullName} <br />
                              </>
                            ))}
                          </p>
                        </InfoListItem>

                        <InfoListItem>
                          <p className="key">capacity </p>
                          <p className="value">{v.capacity}</p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">date </p>
                          <p className="value">{new Date(v.date).toLocaleDateString("en")}</p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">event time</p>
                          <p className="value">
                            {new Date(v.startTime).getHours() + ":" + padTo2Digits(new Date(v.startTime).getMinutes())} -{" "}
                            {new Date(v.endTime).getHours() + ":" + padTo2Digits(new Date(v.endTime).getMinutes())}
                          </p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">Price</p>
                          <p className="value price">{v.price ? numberPrettier(v.price) + " UZS" : null}</p>
                        </InfoListItem>
                        <InfoListItem>
                          <p className="key">Type</p>
                          <p className={`value ${v.online ? "price" : "gr-name"}`}>{v.online ? "Online" : "Offline"}</p>
                        </InfoListItem>
                      </div>
                    ))}
              </Flex>
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default ModalInvoice;
