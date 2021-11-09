import DefaultNavbar from 'components/DefaultNavbar';
import Register from 'pages/Register';
export default function Landing() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Register />
            </main>
        </>
    );
}
