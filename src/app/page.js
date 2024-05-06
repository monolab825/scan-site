
import Validatorform from "@/components/Validatorform";




export default function Home() {
  return (
    <>
     <div className="homePage d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-10 col-xl-8">
            <div className="validatorHome text-center">
              <h1 className="text-white mb-4">Effortlessly Analyze Your Competitive Landscape</h1>
              <div className="row justify-content-center">
                <div className="col-sm-10 col-md-8">
                  <Validatorform />
             
                 
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
