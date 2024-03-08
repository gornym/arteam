<template>
  <section id="section4">
    <div class="left-box">
      <div class="left-main-box">
        <div class="left-box-heading">
          <a>kontakt</a>
        </div>
        <div class="left-box-content">
          <p>
            Chętnie nawiążemy z Tobą kontakt!<br /><br />
            Masz pytania, sugestie lub po prostu chcesz się z Nami
            skontaktować?<br /><br />
            Jesteśmy dostępni, aby odpowiedzieć na Twoje potrzeby.
            <br />Wypełnij formularz kontaktowy, a My postaramy się odpowiedzieć
            najszybciej, jak to możliwe.<br /><br />
            Dziękujemy za zainteresowanie Naszą firmą!
          </p>
          <div class="info-box">
            <div class="info">
              <div class="phone">
                <span class="material-symbols-outlined"> phone_in_talk </span>
                +48 510 451 111
              </div>
              <div class="phone">
                <span class="material-symbols-outlined"> phone_in_talk </span>
                +48 731 391 033
              </div>
            </div>
            <div class="info">
              <div class="city">
                <span class="material-symbols-outlined"> location_on </span>
                Warszawa
              </div>
              <div class="address">
                <span class="material-symbols-outlined"> home </span>
                05-077, Diamentowa 1/13
              </div>
            </div>
            <div class="info">
              <div class="email">
                <span class="material-symbols-outlined"> mail </span>
                luxibud@wp.pl
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="right-main-box">
        <div class="form-heading">
          <a>formularz kontaktowy</a>
        </div>
        <div class="form-main-box">
          <form @submit.prevent="handleSubmit">
            <div class="form-box">
              <label for="email">Adres e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                v-model="email"
                required
              />
            </div>
            <div class="form-box">
              <label for="temat">Temat</label>
              <input
                type="text"
                id="temat"
                name="temat"
                v-model="temat"
                required
              />
            </div>
            <div class="form-box">
              <label for="skad">Skąd o nas wiesz</label>
              <select id="skad" name="skad" v-model="skad">
                <option value="reklama">Reklama</option>
                <option value="zalecana_przez_kogos">
                  Zalecana przez kogoś
                </option>
                <option value="inne">Inne</option>
              </select>
            </div>
            <div class="form-box">
              <label for="tresc">Treść wiadomości</label>
              <textarea
                id="tresc"
                name="tresc"
                rows="4"
                v-model="tresc"
                required
              ></textarea>
            </div>
            <div class="button-box">
              <button type="submit">Wyślij wiadomość</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from "@/main.js";
import { collection, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      temat: "",
      skad: "",
      tresc: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const data = {
          content: this.tresc,
          email: this.email,
          topic: this.temat,
          from: this.skad,
        };

        if (db) {
          const docRef = await addDoc(collection(db, "emails"), data);

          console.log("Document written with ID: ", docRef.id);

          this.email = "";
          this.temat = "";
          this.skad = "";
          this.tresc = "";
        } else {
          console.error("Error: db is undefined");
        }
      } catch (error) {
        console.error("Error adding document:", error);
      }
    },
  },
};
</script>

<style lang="scss">
#section4 {
  height: 100vh;
  width: 100%;
  background: linear-gradient(#adadad33, #5353539e);
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  .left-box {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .left-main-box {
      height: 75%;
      margin-top: 15vh;
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .left-box-heading {
        height: auto;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          text-transform: uppercase;
          font-family: "Ubuntu", sans-serif;
          color: #1f1f1f;
          font-size: 2.5rem;
          font-weight: 700;
          filter: drop-shadow(0px 0px 5px rgb(255, 255, 255));
          padding-top: 20px;
        }
      }
      .left-box-content {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        p {
          text-align: center;
          color: #1f1f1f;
          font-size: 1.2rem;
          font-family: "Montserrat", sans-serif;
          filter: drop-shadow(0px 0px 3px rgb(255, 255, 255));
          padding: 15px 10px;
        }
        .info-box {
          height: auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .info {
            height: auto;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 10px 0px;
            gap: 4rem;
            .phone,
            .city,
            .address,
            .email {
              height: auto;
              width: auto;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              font-size: 1rem;
              color: #1f1f1f;
              font-family: "Montserrat", sans-serif;
              gap: 1rem;
              font-weight: 700;
              filter: drop-shadow(0px 0px 2px rgb(255, 255, 255));
              span {
                font-size: 1.5rem;
                color: #1f1f1f;
                filter: drop-shadow(0px 0px 2px rgb(110, 110, 110));
              }
            }
          }
        }
      }
    }
  }
  .right-box {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .right-main-box {
      height: 75%;
      margin-top: 15vh;
      width: 90%;
      background: linear-gradient(#39393983, #1c1c1c5d);
      background-color: #3b3b3b;
      box-shadow: 0px 0px 15px black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .form-heading {
        height: auto;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          text-transform: uppercase;
          font-family: "Ubuntu", sans-serif;
          color: #e5e5e5;
          font-weight: 700;
          font-size: 2.5rem;
          filter: drop-shadow(0px 0px 5px black);
          padding: 20px 0px;
        }
      }
      .form-main-box {
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .form-box {
          height: auto;
          width: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          label {
            color: #e5e5e5;
            font-family: "Montserrat", sans-serif;
            font-size: 1.2rem;
            padding: 10px 0px;
            font-weight: 700;
            filter: drop-shadow(0px 0px 2px black);
          }
          input,
          select {
            width: 25rem;
            font-size: 1.2rem;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #e5e5e5;
            outline: none;
            color: #e5e5e5;
          }
          select {
            cursor: pointer;
          }
          input:focus {
            outline: none;
          }
          option {
            color: #1b1b1b;
          }
          textarea {
            resize: none;
            width: 24.5rem;
            height: 4.5rem;
            outline: none;
            border: none;
            background-color: #e5e5e516;
            color: #e5e5e5;
            font-size: 1.1rem;
            padding: 0.5rem 0.5rem;
          }
          textarea:focus {
            outline: none;
          }
        }
        .button-box {
          height: auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            padding: 5px 10px;
            font-size: 1.3rem;
            font-weight: 700;
            text-transform: uppercase;
            background-color: rgba(0, 0, 0, 0.22);
            border: none;
            color: #e5e5e5;
            box-shadow: 0px 0px 10px black;
            font-family: "Montserrat", sans-serif;
            filter: drop-shadow(0px 0px 3px black);
            margin: 15px 0px;
            cursor: pointer;
            transition: 0.4s all;
          }
          button:hover {
            box-shadow: 0px 0px 10px #e5e5e537;
          }
        }
      }
    }
  }
}
</style>
