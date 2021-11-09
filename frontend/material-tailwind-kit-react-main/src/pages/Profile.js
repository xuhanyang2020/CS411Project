import DefaultNavbar from 'components/DefaultNavbar';
import Header from 'components/profile/Header';
import Content from 'components/profile/Content';

export default function Profile() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Header />
                <Content />
            </main>
        </>
    );
}
