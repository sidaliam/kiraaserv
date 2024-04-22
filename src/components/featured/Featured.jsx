import useF from "../../Hooks/useF";
import "./featured.css";

const Featured = () => {
  const { data, error, loading } = useF(
    "/hotels/Countbycity?cities=Alger,Dublin,St peetersburg"
  );
  console.log(data);
  return (
    <div className="containerb">
      {loading ? (
        "Chargement ..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Martyrs_Memorial._Algiers%2C_Algeria.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Alger</h2>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cdn.lapatrienews.dz/wp-content/uploads/2022/12/Ain-el-fouara.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Sétif</h2>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Chapelle_de_Santa_Cruz%2C_Oran.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Oran</h2>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://www.idhcorporate.com/img/circuit/c2_tizi.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Tizi Ouzou</h2>
              <h2>{data[3]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://blog.lefigaro.fr/algerie/12%20entre%CC%81e.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Annaba</h2>
              <h2>{data[4]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Blida_centre.jpg/2560px-Blida_centre.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Blida</h2>
              <h2>{data[5]} properties</h2>
            </div>
          </div>
          

          
        </>
      )}
    </div>
  );
};

export default Featured;
