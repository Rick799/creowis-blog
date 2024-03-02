'use client';

import { gql, useQuery } from "@apollo/client";
import client from "../../components/apolloClient";
import { PiDotOutlineFill } from "react-icons/pi";
import Link from "next/link";

const query = gql`
  query postDetails {
    publication(host: "creowis.hashnode.dev") {
      posts(first:10) {
        totalDocuments
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            title
            brief
            publishedAt
            author {
              name
              profilePicture
            }
            content {
              html
            }
            readTimeInMinutes
            tags {
              name
              id
            }
            reactionCount
            comments(first: 20) {
              totalDocuments
              edges {
                node {
                  content {
                    html
                  }
                  author {
                    name
                    profilePicture
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function CreoBlog() {
  const { loading, error, data } = useQuery(query, { client });
  console.log(data);

  if (loading) return <p className="text-4xl h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-slate-950">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-slate-950">
        <div className="w-full lg:w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-12 justify-items-center px-16 py-14 ">
          {data.publication.posts.edges.map((post: any, index: number) => (
          <Link key={index}  href={`/creo/singleBlog/${encodeURIComponent(post.node.title)}`}>

              <div  className="w-full h-full cursor-pointer" >
                <h2 className="font-bold text-xl my-3">{post.node.title}</h2>
                <p className="font-medium text-gray-400">{post.node.brief}</p>
                <div className="my-8 flex flex-wrap">
                  {post.node.tags.map((tag: any, id: number) => (
                <span key={id} className="mr-2 mb-2 text-sm border border-green-200 rounded-xl px-2.5 py-0.5 text-green-400">{tag.name}</span>
                        ))}
                </div>
                <div className="w-72 flex items-center">
                  <img src={post.node.author.profilePicture} alt={post.node.author.name} className="w-8 h-8 rounded-full mr-2"/>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-sm">{post.node.author.name}</h2>
                    <span className="text-xl">
                      <PiDotOutlineFill />
                    </span>
                  <h2 className="font-medium tracking-tighter text-gray-500 mb-0.5">{post.node.readTimeInMinutes} min read</h2>
                </div>
                  </div>
                {/* <p>{post.node.content.html}</p> */}
              </div>
              </Link>
          ))}
        </div>
      </div>
    </>
  );
}
