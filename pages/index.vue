<template>
  <div class="main">
    <UIModal v-model="isModal" width="580" :title="'asf'">
      <div class="model-wrapper">
        <div class="modal">
          <div class="content-modal">
            <h1>СТАНЬТЕ ЧАСТЬЮ МЕРОПРИЯТИЯ</h1>

            <input placeholder="Корпоративная почта" v-model="data2.mail" />

            <div class="write">
              <button @click="send('record')">Записаться</button>

              <p>
                Нажимая кнопку «Записаться» вы соглашаетесь с обработкой
                персональных данных
              </p>
            </div>
          </div>
        </div>
      </div>
    </UIModal>
    <div class="header">
      <img src="../public/assets/img/icons/logo-turan.svg" />

      <h1>EVENT SPACE</h1>

      <div class="photo">
        <div>
          <img src="../public/assets/img/icons/oneE.png" alt="img" />
          <img src="../public/assets/img/icons/twoE.png" alt="img" />
          <img src="../public/assets/img/icons/threeE.png" alt="img" />
          <img src="../public/assets/img/icons/sevenE.png" alt="img" />
          <img src="../public/assets/img/icons/oneE.png" alt="img" />
        </div>

        <div>
          <img src="../public/assets/img/icons/fourE.png" alt="img" />
          <img src="../public/assets/img/icons/fiveE.png" alt="img" />
          <img src="../public/assets/img/icons/sixE.png" alt="img" />
          <img src="../public/assets/img/icons/eightE.png" alt="img" />
          <img src="../public/assets/img/icons/fourE.png" alt="img" />
        </div>
      </div>

      <h2>Будь в курсе всех мероприятий в turan university*</h2>

      <button @click="scrollTo()">Перейти к мероприятиям</button>
    </div>

    <div class="content">
      <div class="content-mission">
        <p class="content-mission__title">Наша миссия</p>

        <div>
          <p class="content-mission__description">
            <span>Способствовать прогрессу общества</span> через предоставление
            качественного бизнес-образования,
            <span>проведение актуальных научных исследований</span> и внедрение
            прорывных инноваций, <span>готовить кадры</span>, способные
            принимать эффективные решения
          </p>

          <div class="content-mission__statistic">
            <div>
              <p class="content-mission__number">27</p>
              <p class="content-mission__number-description">
                Мероприятий проведено в 2023 году
              </p>
            </div>
            <div>
              <p class="content-mission__number">1000+</p>
              <p class="content-mission__number-description">
                Студентов приняло участие в наших событиях
              </p>
            </div>
            <div>
              <p class="content-mission__number">11</p>
              <p class="content-mission__number-description">
                Публикации в СМИ о нашей организации
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-events" ref="eventBlock">
        <div class="content-events__header">
          <p>Мероприятия</p>
          <h1>События, которые формируют завтрашний день</h1>
        </div>

        <ul>
          <li v-for="(event, index) of eventsInfo" :key="event.id">
            <div class="content-events__list-item-header" ref="infoRefs">
              <div class="content-events__list-item-right">
                <div>
                  <span>{{ event.date.day + " " + event.date.month }}</span>
                  <span>{{ event.date.year }}</span>
                </div>
                <p>{{ event.title }}</p>
              </div>

              <img src="../public/assets/img/icons/plus.svg" alt="plus" />
            </div>

            <div class="content-events__list-item-content" ref="infoContent">
              <div class="info__place">
                <div class="place">
                  <p class="info__place__first">Место проведения</p>
                  <p class="info__place__second">{{ event.place }}</p>
                </div>

                <div class="time">
                  <p class="info__place__first">Время</p>
                  <p class="info__place__second">{{ event.time }}</p>
                </div>
              </div>

              <div class="content-events__description">
                <p>{{ event.description.first }}</p>
                <p>{{ event.description.second }}</p>

                <button
                  @click="
                    isModal = true;
                    selectedEvent = event.title;
                  "
                >
                  Записаться
                </button>
              </div>

              <img
                :src="`http://localhost:3000/assets/img/icons/${event.img}.png`"
                alt="eventimg"
              />
            </div>
          </li>
        </ul>

        <div class="archive">
          <span>Архив</span>

          <button>Показать больше</button>
        </div>
      </div>

      <div class="content-offers">
        <p>Предложения</p>

        <div class="content-offers__form-wrapper">
          <h1>
            Делитесь своими креативными идеями с нами,
            <span
              >Мы готовы воплотить ваше вдохновение в увлекательные
              мероприятия</span
            >
          </h1>

          <div class="wrapper">
            <form>
              <div>
                <input
                  placeholder="Корпоративная почта"
                  v-model="data.mail"
                  type="text"
                />
                <input
                  placeholder="Название идеи"
                  v-model="data.idea"
                  type="text"
                />
              </div>
              <input
                placeholder="Суть идеи"
                v-model="data.essence"
                type="text"
              />
            </form>
          </div>

          <div class="send">
            <button @click="send('nerecord')">Отправить</button>

            <p>
              Нажимая кнопку «Отправить» вы соглашаетесь с обработкой
              персональных данных
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <h1>EVENT SPACE</h1>
      <p>
        *Студенческий клуб направленный на развитие студенческой жизни в рамках
        университета Turan™. Не является коммерческой организацией.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

import UIModal from "../components/Modal.vue";

const date = new Date();
const selectedEvent = ref<string>("");
const isModal = ref<boolean>(false);
const eventBlock = ref<any>(null);
const infoContent = ref<HTMLElement | null>(null);
const eventsInfo = ref<any>([
  {
    id: 1,
    date: {
      day: "4",
      month: "Апреля",
      year: "2024",
    },
    description: {
      first:
        "Наши студенты представят передовые разработки в области робототехники, искусственного интеллекта, автоматизации и других ключевых секторов, которые изменят мир в ближайшие годы. ",
      second:
        "От умных роботов, способных помочь в быту и производстве, до инновационных решений в медицине, образовании и промышленности — наша выставка объединяет лучшие идеи и технологии.",
    },
    title: "Выставка робототехники и инноваций",
    place: "Университет Туран, 334 аудитория",
    time: "15:00",
    img: "one",
  },

  {
    id: 2,
    date: {
      day: "28",
      month: "Марта",
      year: "2024",
    },
    description: {
      first:
        'Студенческое мероприятие "Театральное представление от клуба «КВН»" обещает быть захватывающим и веселым вечером, полным ярких эмоций и творческого вдохновения! Вас ждет увлекательное шоу, созданное талантливыми студентами, которые сочетают в себе комедийный дар и актерское мастерство.',
      second: "",
    },
    title: "Театральное представление от клуба «КВН»",
    place: "Университет Туран, Актовый зал",
    time: "12:00",
    img: "two",
  },

  {
    id: 3,
    date: {
      day: "15",
      month: "Марта",
      year: "2024",
    },
    description: {
      first:
        "Это мероприятие не только поможет сделать Терренкур более чистым и зеленым местом, но и позволит студентам провести время с пользой, научиться важным навыкам в области охраны окружающей среды и вдохновить других на заботу о природе. Субботник — 'Забота об экологии' в г. Алматы в Терренкуре - это отличная возможность сделать практический вклад в сохранение окружающей среды и создать лучшую будущую среду для всех.",
      second: "",
    },
    title: "Субботник — «Забота об экологии» в г. Алматы",
    place: "Алматы, Терренкур",
    time: "14:00",
    img: "three",
  },

  {
    id: 4,
    date: {
      day: "26",
      month: "Февраля",
      year: "2024",
    },
    description: {
      first:
        "В рамках мероприятия участники будут поднимать разнообразные вопросы, связанные с методами и средствами пропаганды, эффективностью различных подходов, а также влиянием ценностей на общество и молодежь. Дебаты станут площадкой для конструктивного диалога, где будут выявлены различные точки зрения, аргументы и контраргументы.",
      second:
        "Студенты-участники смогут продемонстрировать свои аналитические и аргументационные навыки, развить критическое мышление и умение аргументировать свою позицию.",
    },
    title:
      "Дебаты на тему «Как оптимизировать пропаганду ценностей в 21 веке?»",
    place: "Университет Туран, 118 аудитория",
    time: "10:00",
    img: "four",
  },

  {
    id: 5,
    date: {
      day: "20",
      month: "Февраля",
      year: "2024",
    },
    description: {
      first:
        "Соревнования по футболу среди студентов - это захватывающее спортивное мероприятие, которое объединяет молодежь в духе здоровой конкуренции, командного духа и футбольной страсти. На этих соревнованиях студенты имеют возможность продемонстрировать свои спортивные навыки, силу, выносливость и умение работать в команде.",
      second: "",
    },
    title: "Соревнования по Футболу",
    place: "",
    time: "",
    img: "five",
  },

  {
    id: 6,
    date: {
      day: "13",
      month: "Февраля",
      year: "2024",
    },
    description: {
      first:
        "Давайте сделаем этот сезон незабываемым! Примите вызов и присоединяйтесь к соревнованиям по волейболу среди студентов! Покажите свою страсть к игре, раскройте свой спортивный потенциал и создайте яркие моменты на поле вместе с нами.",
      second:
        "Участвуйте в командных баталиях, где каждый розыгрыш будет шагом к победе. Насладитесь энергией и азартом соревновательной атмосферы, сделайте новых друзей и обретите незабываемый опыт игры в волейбол.",
    },
    title: "Соревнования по Волейболу",
    place: "",
    time: "",
    img: "six",
  },
]);

const scrollTo = () => {
  eventBlock.value.scrollIntoView({ block: "start", behavior: "smooth" });
};

const data = ref<any>({
  mail: "",
  idea: "",
  essence: "",
});

const data2 = ref<any>({
  mail: "",
  event: "",
  time: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
});

const send = async (type: string) => {
  data2.value.event = selectedEvent.value;
  const dataForSend1 = {
    to: "ilyasovakzhan@gmail.com",
    subject: "Предложение для мероприятия",
    html: `<p style='font-size: 16px;'>Отправитель: ${data.value.mail}</p>
      <p style='font-size: 16px;'>Идея: ${data.value.idea}</p>
      <p style='font-size: 16px;'>Суть идеи: ${data.value.essence}</p>
    `,
  };

  const dataForSend2 = {
    to: "ilyasovakzhan@gmail.com",
    subject: "Запись на мероприятие",
    html: `<p style='font-size: 16px;'>Желающий: ${data2.value.mail}</p>
    <p style='font-size: 16px;'>Мероприятие: ${data2.value.event}</p>
    <p style='font-size: 16px;'>Время записи: ${data2.value.time}</p>
    `,
  };
  try {
    if (type === "record") {
      const response = await axios.post(
        "http://localhost:4000/send-email",
        dataForSend2
      );
      console.log(response.data);
    } else {
      const response = await axios.post(
        "http://localhost:4000/send-email",
        dataForSend1
      );
      console.log(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
.main {
  overflow: hidden;
}

.header {
  background-color: #0a1f30;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px 200px;
  gap: 32px;

  .photo {
    display: flex;
    flex-direction: column;
    gap: 15px;

    div {
      display: flex;
      gap: 15px;
    }
  }

  h1 {
    color: #429ae0;
    font-size: 182px;
    font-weight: 200;
    line-height: 200px;
  }

  h2 {
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    text-transform: uppercase;
  }

  button {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background-color: #297abb;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    border: 1px solid #297abb;
    cursor: pointer;
    box-shadow: 0px 0px 300px 0px #297abb;
  }
}

.content {
  display: flex;
  flex-direction: column;
  padding: 200px 50px;
  gap: 200px;

  &-mission {
    display: flex;
    flex-direction: row;
    gap: 75px;

    &__title {
      text-wrap: nowrap;
      font-size: 20px;
      font-weight: 500;
      color: #2878b8;
    }

    &__description {
      text-transform: uppercase;
      font-size: 32px;
      font-weight: 500;
      color: #b2bcc9;

      span {
        color: #0a1f30;
      }
    }

    &__statistic {
      display: flex;
      flex-direction: row;
      gap: 87px;
    }

    &__number {
      font-size: 64px;
      font-weight: 500;
      color: #448bc4;
    }

    &__number-description {
      color: #0a1f30;
      font-size: 17px;
      font-weight: 500;
    }
  }

  &-events {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &__header {
      display: flex;
      align-items: center;
      gap: 75px;

      p {
        font-size: 20px;
        font-weight: 500;
        color: #2878b8;
      }

      h1 {
        font-size: 32px;
        font-weight: 500;
        color: #0a1f30;
        text-transform: uppercase;
      }
    }

    ul {
      list-style-type: none;

      li {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #0a1f30;
        overflow: hidden;
        transition: height 0.3s ease-in-out;

        &:last-child {
          border-bottom: 1px solid #0a1f30;
        }

        .content-events__list-item-header {
          display: flex;
          align-items: center;
          min-width: 100%;
          justify-content: space-between;
          cursor: pointer;
          padding: 24px 0px;

          .content-events__list-item-right {
            display: flex;
            gap: 40px;
            align-items: center;

            div {
              display: flex;
              align-items: center;
              gap: 10px;

              span:first-child {
                color: #0a1f30;
                font-size: 24px;
                font-weight: 300;
              }

              span:last-child {
                color: #b2bcc9;
                font-size: 17px;
              }
            }

            p {
              color: #0a1f30;
              font-size: 24px;
              font-weight: 500;
            }
          }

          img {
            width: 23px;
            height: 23px;
          }
        }

        .content-events__list-item-content {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          padding-bottom: 15px;

          .info__place {
            display: flex;
            flex-direction: column;
            gap: 15px;

            .place,
            .time {
              display: flex;
              flex-direction: column;

              .info__place__first {
                font-size: 15px;
                color: #b2bcc9;
              }

              .info__place__second {
                font-size: 17px;
                color: #0a1f30;
              }
            }
          }

          .content-events__description {
            display: flex;
            flex-direction: column;
            gap: 15px;

            p {
              font-size: 17px;
              color: #0a1f30;
            }

            button {
              width: 145px;
              color: #fff;
              background-color: #448bc4;
              border-radius: 6px;
              border: 1px solid #448bc4;
              padding: 8px 24px;
              cursor: pointer;
              margin-top: 40px;
            }
          }

          img {
            width: 250px;
            height: 250px;
          }
        }
      }
    }

    .archive {
      display: flex;
      gap: 40px;
      align-items: center;

      span {
        color: #b2bcc9;
        font-size: 20px;
        font-weight: 500;
      }

      button {
        background-color: transparent;
        color: #448bc4;
        font-size: 17px;
        font-weight: 500;
        padding: 8px 24px;
        border: 1px solid #448bc4;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }

  &-offers {
    display: flex;
    gap: 75px;

    p {
      color: #2878b8;
      font-size: 20px;
      font-weight: 500;
    }

    .content-offers__form-wrapper {
      display: flex;
      flex-direction: column;
      gap: 32px;

      h1 {
        color: #0a1f30;
        font-size: 32px;
        font-weight: 500;
        text-transform: uppercase;

        span {
          color: #b2bcc9;
        }
      }

      .wrapper {
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          div {
            display: flex;
            gap: 20px;

            input {
              border: none;
              border-bottom: 1px solid #0a1f30;
              padding: 10px 20px;
              width: 280px;

              &::placeholder {
                font-size: 17px;
                color: #b2bcc9;
              }
            }
          }

          input {
            border: none;
            border-bottom: 1px solid #0a1f30;
            padding: 3px 20px;
            width: 580px;

            &::placeholder {
              font-size: 17px;
              color: #b2bcc9;
            }
          }

          input:focus {
            outline: none;
          }
        }
      }

      .send {
        display: flex;
        gap: 16px;
        align-items: center;

        button {
          border: 1px solid #448bc4;
          padding: 8px 24px;
          background-color: #448bc4;
          font-size: 17px;
          font-weight: 500;
          color: #fff;
          border-radius: 6px;
          cursor: pointer;
        }

        p {
          font-size: 12px;
          font-weight: 500;
          color: #b2bcc9;
        }
      }
    }
  }
}

.footer {
  display: flex;
  flex-direction: column;
  padding: 90px 50px 10px;
  background-color: #0a1f30;
  text-align: center;

  h1 {
    font-size: 182px;
    font-weight: 200;
    color: #429ae0;
  }

  p {
    font-size: 12px;
    font-weight: 500;
    color: #586b7a;
  }
}

.modal-wrapper {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.modal {
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    color: #0a1f30;
    font-size: 32px;
    font-weight: 500;
  }

  .content-modal {
    display: flex;
    flex-direction: column;
    gap: 20px;

    input {
      border: none;
      border-bottom: 1px solid #0a1f30;
      padding: 10px 20px;

      &::placeholder {
        font-size: 17px;
        color: #b2bcc9;
      }

      &:focus {
        outline: none;
      }
    }

    .write {
      display: flex;
      gap: 10px;

      button {
        background-color: #448bc4;
        padding: 8px 24px;
        border: 1px solid #448bc4;
        cursor: pointer;
        color: #fff;
        border-radius: 6px;
      }

      p {
        color: #b2bcc9;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
}
</style>
