import styled from "styled-components";
export const SummaryStyles = styled.div`
.main_user_img{
    width: 100%;
    min-height: 322px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
}
.region{
    height: 0;
    overflow: hidden;
    &.open{
    height: 100%
    }
}
.labelsmy{
    display: flex;
    padding: 5px;
    margin: 5px;
}
.rs-picker-toggle-value{
    color: #777E91 !important;
}
.select__clear-indicator, .select__indicator-separator{
    display: none !important;
}
.allComment{
    background: #FCFCFD;
    border-radius: 10px;
    margin-top: 20px;
    padding: 10px 5px 0;
    &__body{
    padding: 10px 16px 0;
    min-height: 158px;
    max-height: 158px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 7px;
        height: 11px;
        padding: 5px;
      }

      &::-webkit-scrollbar-track {
        /* display: none; */
        padding: 5px;

      }
      &::-webkit-scrollbar-thumb {
        background: rgba(119, 126, 144, 1);
        padding: 5px;
        border-radius: 5px;
        transition: 0.2s;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: rgba(119, 126, 144, 0.8);
      }
        .comment-row{
            display: flex;
            flex-direction: column;
            .commit-row-text{
                margin-top: 6px;
                margin-bottom: 12px;
                    font-size: 12px;
                    color: #000000;
            }
            .comment-row-action{
                display: flex;
                align-items: center;
                .ui__icon__wrapper.md{
                    width: 15px;
                    height: 15px;
                }
                .ui__icon__wrapper.md .icon{
                    width: 14px !important;
                    height: 14px !important;
                }
                .commit-row-userName{
                    font-size: 12px;
                    font-weight: 600;
                    color: #3772FF;
                        margin-right: 15px;
                }
                .commit-row-date{
                    color: #777E91;
                    font-size: 10px;
                    font-weight: 500;
                    margin: auto 7px auto 25px;
                }
                .commit-row-time{
                    margin: auto 15px auto 0px;
                    color: #777E91;
                    font-size: 10px;
                    font-weight: 500;
                }
            }
        }
    }
}
.allComment__footer{
    .comment_input{
        padding: 0 8px 8px;
        display: flex;
        align-items: center;
        .input-wrapper{
            width: 100%;
            display: flex;
            align-items: center;
            border: 1px solid  ${({ isFocus }) => (isFocus ? "#45B26B" : "#fff")};
            border-radius: 6px;
            padding: 4px 4px 4px 10px;
            background: ${({ isFocus }) => (isFocus ? "#F4F5F6" : "#F8F9FA")};
            height: 38px;
           .comment-input{
               width: 100%;
                outline: none;
                border: none;
                background: transparent;
                ::placeholder{
                    color: #B1B5C4;
                }
           }
            .form-input-container{
                border: none;
                height: 100% !important;
            }
            .form-input{
                height: 28px;
                font-size: 10px;
                background: ${({ isFocus }) => (isFocus ? "#F4F5F6" : "#F8F9FA")};
            }
        }
        .ui__icon__wrapper.md{
            background: ${({ isFocus }) => (isFocus ? "#45B26B" : "#FCFCFD")};
            border-radius: 3px;
            padding: 12px 20px;
            .icon{
                width: 16px;
                height: 16px;
            background: ${({ isFocus }) => (isFocus ? "#FCFCFD" : "rgba(177, 181, 195, 1)")};

            }
        }
    }
}
.selectContainer{
    width: 100%;
    .select__control{
        height: 50px;
    padding: 5px 10px 10px 10px;

    }
}
.imgContainer{
  width: 100% !important;
    margin-bottom: 20px;
    height: 322px !important;
}
.rs-picker-toggle-wrapper .rs-picker-toggle.rs-btn{
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 0 0 10px;
    svg{
        top: auto !important;
        right: 15px;
    }
}
}
.rs-picker-toggle-wrapper{
   width: 100%;
}

.select__header{
    height: 50px;
}
.collapse__body.active{
    padding: 40px 30px;
  }
.firstCollapse{
     &.active{
  margin-bottom: 50px;
  
  .collapse__title {
      background: #353945;
      color: #FCFCFD;
  }
}
}
.img-container{
  padding: 0 15px !important;
}
.select__text{
    line-height: 14px !important;
    color: #777E91;
}
.form-input-container{
  width: 100% !important;
  height: 48px !important;
  input{
    font-size: 16px !important;
    line-height: 24px !important;
    color: #777E91;
  }
}
.first-row{
  margin-bottom: 30px;
}
.dateInputContainer{
  height: 50px;
  width: 100%;
  input{
    font-size: 16px !important;
    line-height: 24px !important;
    color: #777E91;
  }
}
.Select__controller{
  height: 50px;
  input{
    font-size: 16px !important;
    line-height: 24px !important;
  }
}
  .label {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 12px;
    text-transform: uppercase;
    color: #353945;
    margin-bottom: 40px;
    display: inline;
    .input-label {
      display: inline-block;
      margin-bottom: 14px;
      /* margin-bottom: 10px; */
    }
  }
  .privileges-component {
        width: 100%;
        .label, .Select__controller {
          width: 100%;
        }
      }
   .radioLabel {
      .radio-section {
        margin-bottom: 8px;
      }
    }
    .rs-picker-toggle:after{
        display: none;
    }
    .rs-picker-toggle:before{
        top: 15px !important;
        transform: scale(1.3);
        right: 10px;
    }
    .multiSelect{
        div:hover{
            border: none !important;
        }

    }
    .select__header__content{
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 50px;
        display: flex;
    }
    .form-input-container{
        /* height: 46px !important; */
    }
    .multiValue{
            /* padding: 0px 8px 2px 6px; */
            padding: 6px 8px 6px 12px !important;
                margin: 0 5px 0 0px !important;
    }
    .rs-picker-toggle-wrapper{
        margin-bottom: 0 !important;
    }
.radio-section-input{
        height: 48px;
}

input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #fcfcfd inset;
    box-shadow: 0 0 0 30px #fcfcfd inset;
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
`;
