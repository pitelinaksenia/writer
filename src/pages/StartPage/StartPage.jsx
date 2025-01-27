import React from "react";
import "./StartPage.css";
import CardContainer from "../../components/CardContainer/CardContainer";
import CardContent from "../../components/CardContent/CardContent";
import SwipeCardContent from "../../components/SwipeCardContent/SwipeCardContent";
import CardButton from "../../components/CardButton/CardButton";

// главная страница
const StartPage = () => {
  return (
    <>
      <section className="startPageSection first_photo">
        <CardContainer
          style={{
            width: "31vw",
            height: "90vh",
            backgroundColor: "#1D2428",
            opacity: 0.5,
            borderRadius: "90px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(7.8px)",
            WebkitBackdropFilter: "blur(7.8px)",
          }}
        >
          <SwipeCardContent
            overline="Игорь Глушков"
            title="Якутский пленник"
            description="Дебютный сборник рассказов"
            info={`Продано более 3 млн
                           копий по всему миру.
                           Погрузитесь в удивительный мир
                           рассказов и историй.`}
            buttons={[
              {
                id: 0,
                label: "читать",
                onClick: () => console.log("читать clicked"),
              },
            ]}

            // buttons={
            //     [
            //         <CardButton>
            //             label: "",
            //             onClick: () =>
            //         </CardButton>,
            //                                   <CardButton>
            //                                   label: "",
            //                                   onClick: () =>
            //                               </CardButton>,
            //                                                         <CardButton>
            //                                                         label: "",
            //                                                         onClick: () =>
            //                                                     </CardButton>
            //     ]
            // }
          >
            <ul className="cardDots">
              <li className="cardDot active" />
              <li className="cardDot" />
              <li className="cardDot" />
            </ul>
            <button className="cardArrow next" aria-label="Следующий слайд">
              &rarr;
            </button>
          </SwipeCardContent>
        </CardContainer>
      </section>
      <section className="startPageSection second_photo">
        <CardContainer
          style={{
            width: "29vw",
            height: "62vh",
            backgroundColor: "#1D2428",
            opacity: 0.5,
            borderRadius: "80px",
          }}
        >
          <CardContent
            title="Об авторе"
            description="Глушков Игорь Михайлович"
            info={`Родился в Омске в 1957
                       в 1984 окончил СибАДИ
                       Служил в войсках ПВО
                       КМС по плаванию
                       Руководил проектом аэропорт "Федеровка"`}
            buttons={[
              {
                id: 0,
                label: "подробнее",
                onclicked: () => console.log("подробнее clicked"),
              },
            ]}
          />
        </CardContainer>
        <CardContainer
          style={{
            width: "29vw",
            height: "36vh",
            backgroundColor: "#1D2428",
            opacity: 0.5,
            borderRadius: "80px",
          }}
        >
          <CardContent
            title="Книги"
            info={`Вы можете скачать книги,
                       читать их онлайн, а также
                       слушать в аудиоформате`}
            buttons={[
              {
                id: 0,
                label: "читать",
                onclick: () => console.log("читать clicked"),
              },
            ]}
          />
        </CardContainer>
        <CardContainer
          style={{
            width: "29vw",
            height: "35vh",
            backgroundColor: "#344148",
            opacity: 0.5,
            borderRadius: "80px",
          }}
        >
          <CardContent
            title="Контакты"
            info={`Если возникли вопросы,
                       идеи и предложения`}
            buttons={[
              { id: 0, label: "вк", onclick: () => console.log("вк clicked") },
              { id: 1, label: "тг", onclick: () => console.log("тг clicked") },
              {
                id: 2,
                label: "email",
                onclick: () => console.log("email clicked"),
              },
            ]}
          />
        </CardContainer>
      </section>
    </>
  );
};
export default StartPage;
