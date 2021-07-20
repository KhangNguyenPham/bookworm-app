import React from "react";

function About(){
    return(
        <>
            <h4 className="header-about-us">About Us</h4>
            <hr className="hr-about-us"/>
            <div className="about-us-content">
                <h1>Welcom to BookWorm</h1>
                <p className="intrduce-about-us">
                    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                    adipisci velit... There is no one who loves pain itself, who seeks after it and 
                    wants to have it, simply because it is pain..."
                </p>
                <div className="row story-vision">
                    <div className="col-12 col-lg-6 col-md-6">
                        <h4>Our Story</h4>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type 
                            specimen book.
                        </p> 
                        <p>
                            It has survived not only five centuries, but also the leap into 
                            electronic typesetting, remaining essentially unchanged. 
                        </p>
                        <p>
                            It was popularised in 
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                            and more recently with desktop publishing software like Aldus PageMaker including 
                            versions of Lorem Ipsum.
                        </p>
                    </div>
                    <div className="col-12 col-lg-6 col-md-6">
                        <h4>Our Vision</h4>
                        <p>
                            It is a long established fact that a reader will be distracted by the readable 
                            content of a page when looking at its layout. The point of using Lorem Ipsum is 
                            that it has a more-or-less normal distribution of letters, as opposed to using 
                            'Content here, content here', making it look like readable English. 
                        </p>
                        <p>
                            Many desktop 
                            ishing packages and web page editors now use Lorem Ipsum as their default model text, 
                            and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
                            Various versions have evolved over the years, sometimes by accident, sometimes on 
                            purpose (injected humour and the like).
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default About;