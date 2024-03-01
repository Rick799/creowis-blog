'use client';

import { gql, useQuery } from "@apollo/client";
import client from "./apolloClient";

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
      <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 justify-items-center px-20 py-14 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-slate-950">
        {data.publication.posts.edges.map((post: any, index: number) => (
          <div className="w-96 h-96 cursor-pointer" key={index}>
            <h2 className="font-bold text-xl my-3">{post.node.title}</h2>
            <p className="font-medium text-gray-400">{post.node.brief}</p>
            <div className="my-8">
              {post.node.tags.map((tag: any, id: number) => (
            <span key={id} className="mr-2 leading-8 text-sm border border-green-200 rounded-2xl px-2 py-0.5  text-green-400 break-all">{tag.name}</span>
                    ))}
            </div>
            <div className="w-72 flex items-center justify-between">
              <img src={post.node.author.profilePicture} alt={post.node.author.name} className="w-7 h-7 rounded-full"/>
              <div className="flex items-center">
                <h2 className="font-semibold mr-4">{post.node.author.name}</h2>
                <span className="pb-3 text-2xl">.</span>
              </div>
              <h2 className="font-medium tracking-tighter text-gray-500">{post.node.readTimeInMinutes} min read</h2>
            </div>
            {/* <p>{post.node.content.html}</p> */}
          </div>
        ))}
      </div>
    </>
  );
}