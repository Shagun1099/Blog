import Image from 'next/image';
import React from 'react';
import classes from './hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/me.jpeg" alt="An Image showing me" width={300} height={300} />
            </div>
            <h1>Hi, I'm Shagun</h1>
            <p>I blog about web development - especially frontend like
                React and React Native</p>
        </section>
    )
}

export default Hero
