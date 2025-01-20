import React from 'react';
import './StartPage.css';
import CardButton from '../../components/CardButton/CardButton';
import CardContainer from '../../components/CardContainer/CardContainer';


const StartPage = () => {
    return (
        <>
        <section className="startPageSection first_photo">
            <CardContainer
                style={{
                    width: '31vw',
                    height: '90vh',
                    backgroundColor: '#1D2428' ,
                    opacity: 0.5,
                    borderRadius: '90px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(7.8px)',
                    WebkitBackdropFilter: 'blur(7.8px)',
                }}
                >
                <div className="cardContent">
                <h1 className="name">Игорь Глушков</h1>
                <h2 className="cardTitle">Якутский пленник</h2>
                <h3 className="cardDescription">Дебютный сборник рассказов</h3>
                <p className="cardInfo">
                Продано более 3 млн
                <br />
                копий по всему миру. 
                <br />
                Погрузитесь в удивительный мир
                <br />
                рассказов и историй.
                </p>
                <CardButton
                    label="читать"
                />
                <nav className="sliderNavigation">
                <button className="cardArrow prev" aria-label="Предыдущий слайд">
                    &larr;
                </button>
                <ul className="cardDots">
                    <li className="cardDot active" />
                    <li className="cardDot" />
                    <li className="cardDot" />
                </ul>
                <button className="cardArrow next" aria-label="Следующий слайд">
                    &rarr;
                </button>
                </nav>
                </div>
            </CardContainer>
        </section>
        <section className="startPageSection second_photo">
            <CardContainer
                            style={{
                                width: '29vw',
                                height: '62vh',
                                backgroundColor: '#1D2428' ,
                                opacity: 0.5,
                                borderRadius: '80px',
                            }}
            >
            <div className="cardContent">
                <h2 className="cardTitle">Об авторе</h2>
                <h3 className="cardDescription">Глушков Игорь Михайлович</h3>
                <p className="cardInfo">
                Родился в Омске в 1957
                <br />
                в 1984 окончил СибАДИ
                <br />
                Служил в войсках ПВО
                <br />
                КМС по плаванию
                <br />
                Руководил проектом аэропорт "Федеровка"
                </p>
                <CardButton
                    label="подробнее"
                />
            </div>
            </CardContainer>
            <CardContainer                 
                            style={{
                            width: '29vw',
                            height: '36vh',
                            backgroundColor: '#1D2428' ,
                            opacity: 0.5,
                            borderRadius: '80px',
                        }}
            >
            <div className="cardContent">
                <h2 className="cardTitle">Книги</h2>
                <p className="cardInfo">
                Вы можете скачать книги,
                <br />
                читать их онлайн, а также 
                <br />
                слушать слушать в аудиоформате
                </p>
                <CardButton
                    label="читать"
                />
            </div>
            </CardContainer>
            <CardContainer 
                            style={{
                                width: '29vw',
                                height: '35vh',
                                backgroundColor: '#344148' ,
                                opacity: 0.5,
                                borderRadius: '80px',
                            }}
            >
            <div className="cardContent">
                <h2 className="cardTitle">Контакты</h2>
                <p className="cardInfo">
                Если возникли вопросы,
                <br />
                идеи и предложения</p>
                <a href="#" className="cardButton">
                вк
                </a>
                <a href="#" className="cardButton">
                тг
                </a>
                <a href="#" className="cardButton">
                fb
                </a>
                <a href="#" className="cardButton">
                email
                </a>
            </div>
            </CardContainer>
        </section>
        </>
    );
    }
export default StartPage;