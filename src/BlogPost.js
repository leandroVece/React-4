import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./auth";
import blogData from './BlogData'


function BlogPost() {
    const navigator = useNavigate();
    const { slug } = useParams();

    const auth = useAuth()

    const returnToBlog = () => {
        navigator(-1)
    }

    const authorityDelet = auth.user?.Isrol?.rol.delete
    const authorityEdit = auth.user?.Isrol?.rol.write

    const post = blogData.find(x => x.slug === slug)
    return (
        <>
            <h2> {post.title}</h2>
            <p>{post.content}</p>
            <button onClick={returnToBlog}>Volver un paso atras</button>
            {authorityEdit && (
                <button>Editar blog</button>
            )}
            {authorityDelet && (
                <button>Eliminar blog</button>
            )}
        </>
    )
}

export default BlogPost;
