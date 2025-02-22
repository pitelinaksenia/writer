import React from "react";
import Container from "../../components/Container/Container";
import CardContent from "../../components/CardContent/CardContent";
import SwipeCardContent from "../../components/SwipeCardContent/SwipeCardContent";
import TextButton from "../../components/TextButton/TextButton";
import styles from "./StartPage.module.css";
import "../../components/Container/Container.css";

const StartPage = () => {
  return (
    <>
      <div className={styles.startPageSection}>
        <section className={styles.firstPhoto}>
          <Container className="swipeCardContainer">
            <SwipeCardContent
              overline="Игорь"
              title="Якутский пленник"
              description="Дебютный сборник рассказов"
              info={`Продано более 3 млн
                  копий по всему миру.
                  Погрузитесь в удивительный
                  мир рассказов и историй.`}
              buttons={[
                <TextButton
                  className={styles.__textButton}
                  label="читать"
                  onClick={() => {
                    console.log("читать clicked");
                  }}
                />,
              ]}
            ></SwipeCardContent>
          </Container>
        </section>
        <section className={styles.secondPhoto}>
          <Container className="cardContainer">
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
                  className={styles.__textButton}
                  label="подробнее"
                  onClick={() => {
                    console.log("подробнее clicked");
                  }}
                />,
              ]}
            />
          </Container>
          <Container className="cardContainer">
            <CardContent
              title="Книги"
              info={`
                  Вы можете скачать книги,
                  читать их онлайн, а также
                  слушать в аудиоформат
                `}
              buttons={[
                <TextButton
                  className={styles.__textButton}
                  label="читать"
                  onClick={() => {
                    console.log("читать clicked");
                  }}
                />,
              ]}
            />
          </Container>
          <Container className="cardContainer">
            <CardContent
              title="Контакты"
              info={`Если возникли вопросы,
                  идеи и предложения`}
              buttons={[
                <div style={{ display: "flex", gap: "10px" }}>
                  <TextButton
                    className={styles.__textButton}
                    label="вк"
                    onClick={() => {
                      console.log("вк clicked");
                    }}
                  />
                  <TextButton
                    className={styles.__textButton}
                    label="тг"
                    onClick={() => {
                      console.log("тг clicked");
                    }}
                  />
                  <TextButton
                    className={styles.__textButton}
                    label="email"
                    onClick={() => {
                      console.log("email clicked");
                    }}
                  />
                </div>,
              ]}
            />
          </Container>
        </section>
      </div>
    </>
  );
};
export default StartPage;
