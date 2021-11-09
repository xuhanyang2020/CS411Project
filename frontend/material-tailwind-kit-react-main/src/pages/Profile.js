import GatherSportNav from 'components/GatherSportNav';
import Header from 'components/profile/Header';
import Content from 'components/profile/Content';

export default function Profile() {
    return (
        <>
        <GatherSportNav username="Ruth Sabin"/>
            <main>
                <Header />
               <Content />
            </main>
        </>
    );
}
