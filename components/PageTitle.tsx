import Image from "next/image";
type PageTitleProps = {
    title: string;
    textClasses:string;
}

const PageTitle = ({ title, textClasses}: PageTitleProps) => {

    return (
        <div className="flexCenter">

            <div className='relative my-5 py-5'>

                <h2 className={textClasses}>{title}</h2>
            </div>
        </div>
    )
}

export default PageTitle;
