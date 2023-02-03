import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import PostHeader from './post-header';
import classes from './post-content.module.css';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'

SyntaxHighlighter.registerLanguage('js', js);

SyntaxHighlighter.registerLanguage('css', css);

function PostContent(props) {
    const { post } = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderers = {

        paragraph(paragraph) {
            const { node } = paragraph;
            if (node.children[0].type === 'img') {
                const image = node.children[0];
                const imageSrc = `/images/posts/${post.slug}/${image.properties.src}`;
                return (<div className={classes.image}>
                    <Image src={imageSrc} alt={image.alt} width={600} height={300} />
                </div>);
            }
            return <p>{paragraph.children}</p>

        }

    }


    const markDownComponents = {
        p: (paragraph) => {
            const { node } = paragraph

            if (node.children[0].tagName === "img") {
                const image = node.children[0];

                return (
                    <div className="postImgWrapper">
                        <Image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            width={600}
                            height={300}
                            alt={image.properties.alt}

                        />
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        },

        code: (code) => {

            const { language, value, children } = code;
            const snippet = children[0];
            return <SyntaxHighlighter style={atomDark} language={language} children={snippet} >
                {snippet}
            </SyntaxHighlighter >
        }
    };


    return (<article className={classes.content}>

        <PostHeader title={post.title} image={imagePath} />
        <ReactMarkdown components={markDownComponents}>
            {post.content}
        </ReactMarkdown>
    </article>);
}

export default PostContent;