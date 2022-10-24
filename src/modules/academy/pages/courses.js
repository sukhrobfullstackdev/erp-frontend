import React from "react";
import styled from "styled-components";
import CardContainer from "../containers/cardContainer";

const CoursesStyle = styled.div`
  background-color: #f7f7fa;
  min-height: 100vh;
  .card_flex {
    flex-wrap: wrap;
    padding: 30px 38px 0 0px;
  }
`;

const data = {
  courses: [
    {
      color: "#EF466F",
      title: "Flutter Development",
      description: `Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.`,
      status: true,
      countModul: 3,
      countLesson: 30,
    },
    {
      color: "#9757D7",
      title: "Flutter Development",
      description: `Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.`,
      status: false,
      countModul: 3,
      countLesson: 30,
    },
    {
      color: "#3772FF",
      title: "Flutter Development",
      description: `Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.`,
      status: true,
      countModul: 3,
      countLesson: 30,
    },
    {
      color: "#FFD166",
      title: "Flutter Development",
      description: `Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.`,
      status: false,
      countModul: 3,
      countLesson: 30,
    },
    {
      color: "#4BC9F0",
      title: "Flutter Development",
      description: `Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.`,
      status: true,
      countModul: 3,
      countLesson: 30,
    },
    {
      color: "#45B26B",
      title: "Flutter Development",
      description: `Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.`,
      status: false,
      countModul: 3,
      countLesson: 30,
    },
    {
      color: "#777E91",
      title: "Flutter Development",
      description: `Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.Vaqt davomida saytlarning ko‘rinishi va ishlashiga 
      bo‘lgan sifat talabi o‘sishi tufayli shu texnologiyalar.`,
      status: true,
      countModul: 3,
      countLesson: 30,
    },
  ],
};
export default function Courses() {
  return (
    <CoursesStyle>
      <CardContainer data={data} />
    </CoursesStyle>
  );
}
