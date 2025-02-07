import React from "react";
import CardContainer from "../../components/CardContainer/CardContainer";
import CardContent from "../../components/CardContent/CardContent";
import SwipeCardContent from "../../components/SwipeCardContent/SwipeCardContent";
import TextButton from "../../components/TextButton/TextButton";
import ImageButton from "../../components/ImageButton/ImageButton";
import NavigationDots from "../../components/NavigationDots/NavigationDots";
import styles from "./StartPage.module.css";

// главная страница
const StartPage = () => {
  return (
    <>
      <div className={styles.startPageSection}>
        <section className={styles.firstPhoto}>
          {/* <div className="spacer"></div> */}
          <CardContainer
            style={{
              width: "26.7vw",
              height: "81.5vh",
              backgroundColor: "rgba(29, 36, 40, 0.5)",
              borderRadius: "60px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(15px)",
            }}
          >
            <div style={{ padding: "1vh" }}></div>
            <SwipeCardContent
              overline="Игорь Глушков"
              title="Якутский пленник"
              description="Дебютный сборник рассказов"
              info={
                <>
                  Продано более 3 млн <br />
                  копий по всему миру.
                  <br />
                  Погрузитесь в удивительный
                  <br />
                  мир рассказов и историй.
                </>
              }
              buttons={[
                <TextButton
                  className={styles.__textButton}
                  label="читать"
                  onClick={() => {
                    console.log("читать clicked");
                  }}
                />,
              ]}
            >
              <div style={{ margin: "40px" }}></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageButton
                  name="arrowLeft"
                  width="50px"
                  height="50px"
                  fill="none"
                  onClick={() => {
                    console.log("left-arrow clicked");
                  }}
                ></ImageButton>
                <NavigationDots totalDots={3}></NavigationDots>
                <ImageButton
                  name="arrowRight"
                  width="50px"
                  height="50px"
                  fill="none"
                  onClick={() => {
                    console.log("right-arrow clicked");
                  }}
                ></ImageButton>
              </div>
            </SwipeCardContent>
          </CardContainer>
        </section>
        <section className={styles.secondPhoto}>
          <CardContainer
            style={{
              width: "22vw",
              height: "58vh",
              backgroundColor: "rgba(29, 36, 40, 0.5)",
              borderRadius: "50px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(15px)",
            }}
          >
            <div style={{ padding: "2vh" }}></div>
            <CardContent
              title="Об авторе"
              description="Глушков Игорь Михайлович"
              info={
                <>
                  Родился в Омске в 1957
                  <br />
                  в 1984 окончил СибАДИ
                  <br />
                  Служил в войсках ПВО
                  <br />
                  КМС по плаванию
                  <br />
                  Руководил проектом аэропорт "Федеровка"
                </>
              }
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
          </CardContainer>
          <CardContainer
            style={{
              width: "22vw",
              height: "34vh",
              backgroundColor: "rgba(29, 36, 40, 0.5)",
              borderRadius: "50px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(15px)",
            }}
          >
            <div style={{ padding: "2vh" }}></div>
            <CardContent
              title="Книги"
              info={
                <>
                  Вы можете скачать книги,
                  <br />
                  читать их онлайн, а также
                  <br />
                  слушать в аудиоформат
                </>
              }
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
          </CardContainer>
          <CardContainer
            style={{
              width: "22vw",
              height: "33vh",
              backgroundColor: "rgba(29, 36, 40, 0.5)",
              borderRadius: "50px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(15px)",
            }}
          >
            <div style={{ padding: "2vh" }}></div>
            <CardContent
              title="Контакты"
              info={
                <>
                  Если возникли вопросы,
                  <br />
                  идеи и предложения
                </>
              }
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
          </CardContainer>
        </section>
      </div>
    </>
  );
};
export default StartPage;
