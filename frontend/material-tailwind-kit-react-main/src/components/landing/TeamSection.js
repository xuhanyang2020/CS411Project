import Title from 'components/landing/Title';
import TeamCard from 'components/landing/TeamCard';
import Image1 from 'assets/img/profile_default.jpeg';
import Image2 from 'assets/img/profile_default.jpeg';
import Image3 from 'assets/img/profile_default.jpeg';
import Image4 from 'assets/img/profile_default.jpeg';

export default function TeamSection() {
    return (
        <section className="pt-20 pb-48">
            <div className="container max-w-7xl mx-auto px-4">
                <Title heading="Here are our heroes">
                    According to the National Oceanic and Atmospheric
                    Administration, Ted, Scambos, NSIDClead scentist, puts the
                    potentially record maximum.
                </Title>
                <div className="flex flex-wrap">
                    <TeamCard
                        img={Image1}
                        name="Ryan Tompson"
                        position="Web Developer"
                    />
                    <TeamCard
                        img={Image2}
                        name="Romina Hadid"
                        position="Marketing Specialist"
                    />
                    <TeamCard
                        img={Image3}
                        name="Alexa Smith"
                        position="UI/UX Designer"
                    />
                    <TeamCard
                        img={Image4}
                        name="Jenna Kardi"
                        position="Founder and CEO"
                    />
                </div>
            </div>
        </section>
    );
}
