import React from "react";
import CardContainer from "../../components/CardContainer/CardContainer";
import CardContent from "../../components/CardContent/CardContent";
import SwipeCardContent from "../../components/SwipeCardContent/SwipeCardContent";
import TextButton from "../../components/TextButton/TextButton";
import ImageButton from "../../components/ImageButton/ImageButton";
import styles from "./StartPage.module.css";

// главная страница
const StartPage = () => {
  return (
    <>
      <div className={styles.startPageSection}>
        <section className={styles.firstPhoto}>
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
                <TextButton
                  className={styles.swipeCardContent__textButton}
                  label="читать"
                  onClick={() => {
                    console.log("читать clicked");
                  }}
                />,
              ]}
            >
              <ImageButton
                name="arrowLeft"
                width="70"
                height="70"
                fill="none"
                onClick={() => {
                  console.log("left-arrow clicked");
                }}
              ></ImageButton>
              <ImageButton
                name="arrowRight"
                width="70"
                height="70"
                fill="none"
                onClick={() => {
                  console.log("right-arrow clicked");
                }}
              ></ImageButton>
            </SwipeCardContent>
          </CardContainer>
        </section>
        <section className={styles.secondPhoto}>
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
                <TextButton
                  className={styles.cardContent__textButton}
                  label="подробнее"
                  onClick={() => {
                    console.log("подробнее clicked");
                  }}
                />,
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
                <TextButton
                  className={styles.cardContent__textButton}
                  label="читать"
                  onClick={() => {
                    console.log("читать clicked");
                  }}
                />,
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
                <TextButton
                  className={styles.cardContent__textButton}
                  label="вк"
                  onClick={() => {
                    console.log("вк clicked");
                  }}
                />,
                <TextButton
                  className={styles.cardContent__textButton}
                  label="тг"
                  onClick={() => {
                    console.log("тг clicked");
                  }}
                />,
                <TextButton
                  className={styles.cardContent__textButton}
                  label="email"
                  onClick={() => {
                    console.log("email clicked");
                  }}
                />,
              ]}
            />
          </CardContainer>
        </section>
      </div>
    </>
  );
};
export default StartPage;
