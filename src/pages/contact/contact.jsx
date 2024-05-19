import React from "react";
import "./contact.css";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer/Footer";
import Headerx from "../../components/headerx/Headerx";
import { Helmet } from "react-helmet-async";
import { useForm, ValidationError } from "@formspree/react";

function ContactPage() {
  const [state, handleSubmit] = useForm("xdoqjrwd");
  return (
    <div>
      <Helmet>
        <title>contactez nous</title>
        <meta
          name="description"
          content="Si vous êtes une agence de location de voitures et que vous souhaitez vous inscrire pour bénéficier d'une large visibilité et d'une gestion de vos actions, contactez-nous."
        />{" "}
      </Helmet>
      <Navbar />
      <Headerx />
      <div className="secx">
        <div className="section-header">
          <div className="containerv">
            <h2>Contactez-nous</h2>
            <p>
              Si vous êtes une agence de location de voitures et que vous
              souhaitez vous inscrire pour bénéficier d'une large visibilité et
              d'une gestion de vos actions, contactez-nous par :
            </p>
          </div>
        </div>

        <div className="containerv">
          <div className="rowv">
            <div className="contact-info">
              <div className="contact-info-item">
                <div
                  id="contact-info-icon"
                  style={{ marginTop: "5px", color: "#1860e5" }}
                >
                  <FontAwesomeIcon icon={faHome} />
                </div>

                <div className="contact-info-content">
                  <h4 style={{ color: "#1860e5" }}>Address</h4>
                  <p>
                    4671 Sugar Camp Road,
                    <br /> Owatonna, Minnesota, <br />
                    55060
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div
                  id="contact-info-icon"
                  style={{ marginTop: "5px", color: "#1860e5" }}
                >
                  <FontAwesomeIcon icon={faPhone} />
                </div>

                <div className="contact-info-content">
                  <h4 style={{ color: "#1860e5" }}>Phone</h4>
                  <p>571-457-2321</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div
                  id="contact-info-icon"
                  style={{ marginTop: "5px", color: "#1860e5" }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>

                <div className="contact-info-content">
                  <h4 style={{ color: "#1860e5" }}>Email</h4>
                  <p>kirraa@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form action="" id="contact-form" onSubmit={handleSubmit}>
                <h2>Send Message</h2>
                <div className="input-box">
                  <input type="text" id="name" name="name" required={true} />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                  />
                  <span>Full Name</span>
                </div>

                <div className="input-box">
                  <input id="email" name="email" type="email" required={true} />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                  <span>Email</span>
                </div>

                <div className="input-box">
                  <textarea required={true} name="message" id="message"></textarea>
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                  <span>Type your Message...</span>
                </div>

                <div className="input-box">
                  <input type="submit" value="Send" name="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
