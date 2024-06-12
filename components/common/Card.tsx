// components/Card.js
import Image from 'next/image';
import Link from 'next/link';
import {absoluteUrl, formatDate, stripHtml, trimText, loaderProp} from "lib/utils"


const Card = ({node}) => {

    return (

        <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
            <div className="order-1 sm:ml-6 xl:ml-0">
                <h3 className="mb-1 text-slate-900 font-semibold">
                    <span
                        className="mb-1 block text-xs prose-slate prose-sm text-slate-600">Posted by {node.uid.display_name} - {node.field_event_date ? formatDate(node.field_event_date): formatDate(node.created)}</span>
                    <span
                        className="mb-1 block text-sm leading-6 text-cyan-500">{node.field_tags}</span>{node.title}
                </h3>
                <div
                    className="prose prose-slate prose-sm text-slate-600">
                    <p>{trimText(stripHtml(node.body.summary || node.body.processed), 260)}</p>
                </div>

                <Link
                    href={node.path.alias}
                    className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
                >
                    Learn
                    more <span className="sr-only">, Seamless SVG background patterns by the makers of Tailwind CSS.</span>
                    <svg
                        className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                        width="3" height="6" viewBox="0 0 3 6"
                        fill="none" stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M0 0L3 3L0 6"></path>
                    </svg>
                </Link>
            </div>

            {node.field_image && (
                <figure className="my-4">
                    <Image
                        src=
                    {absoluteUrl(node.field_image.field_media_image.uri.url)}
                        width={1216}
                        height={640}
                        loader={loaderProp}
                        alt={node.field_image.field_media_image.resourceIdObjMeta.alt}
                        className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                    />
                </figure>
            )}
        </li>
    )
        ;
};

export default Card;
