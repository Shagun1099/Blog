import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import classes from './post-item.module.css';

const PostItem = (props) => {

    const { title, image, excerpt, date, slug } = props.post;

    const formattedDate = new Date(date).toLocaleDateString('en-Us', { day: "numeric", month: 'long', year: "numeric" });

    const imagePath = `/images/posts/${image}`;
    const linkPath = `/posts/${slug}`;

    return (
        <li className={classes.post}>
            <Link href={linkPath}>
                <a>
                    <div className={classes}>
                        <Image src={imagePath} alt={title} width={300} height={200} layout="responsive" />
                    </div>
                    <div>
                        <h3>{title}</h3>
                        <time>{formattedDate}</time>
                        <p>{excerpt}</p>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default PostItem
