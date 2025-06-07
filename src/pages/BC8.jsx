import React from "react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import bc8 from "/assets/bc8.svg"; // Replace with your diagram path

export default function BusinessCase8() {
  return (
    <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8 dark:prose-invert">
      <h1 className="mb-4 font-extrabold text-4xl">
        Video Recommendation Using Embeddings and KD-Tree Nearest Neighbor Search
      </h1>

      <br />
      <br />
      <div className="w-full max-w-3xl mx-auto mb-8">
        <img
          src={bc8}
          alt="KD-Tree based Video Recommendation System"
          className="w-full h-auto"
          style={{ maxHeight: "500px", objectFit: "contain" }}
        />
      </div>
      <br />
      <br />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Motivation</h2>
        <p>
          Personalized video recommendations are essential to increase user engagement and retention.
          Using raw metadata alone (hashtags, views, length, creator) can be insufficient for accurate similarity measurement.
          Encoding videos into a unified embedding space allows capturing multiple features simultaneously, enabling efficient similarity queries.
        </p>
        <p>
          A KD-Tree spatial index accelerates nearest neighbor search in the embedding space, making real-time recommendations scalable.
        </p>
      </section>

      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">System Design</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Encoder:</strong> Converts video metadata (hashtags, length, creator, views) 
            <br/>into a fixed-dimensional embedding vector <InlineMath math="\mathbf{v} \in \mathbb{R}^d" />.
          </li>
          <li>
            Embeddings capture semantic and quantitative features for similarity comparison.
          </li>
          <li>
            All video embeddings are stored in a KD-Tree data structure for efficient nearest neighbor queries.
          </li>
          <li>
            Incoming user interaction or seed video embedding is used to query the KD-Tree to find top <InlineMath math="k" /> similar videos.
          </li>
          <li>
            Recommendations are updated dynamically as new videos are added or metadata changes.
          </li>
        </ul>
      </section>

      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Algorithm</h2>
        <p>
          The KD-Tree partitions the <InlineMath math="d"></InlineMath>-dimensional embedding space recursively along axis-aligned hyperplanes, allowing logarithmic average query time.
        </p>

        <p><strong>KD-Tree Construction:</strong></p>
        <ul className="list-disc list-inside">
          <li>Choose dimension axis cyclically for splitting at each tree level.</li>
          <li>Split points at median of selected axis to balance the tree.</li>
          <li>Recursively build left and right subtrees.</li>
        </ul>

        <p><strong>Nearest Neighbor Query:</strong></p>
        <pre className="p-4 rounded overflow-x-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
{`function kdTreeNN(queryPoint, node, depth=0):
    if node is null:
        return null

    axis = depth mod d
    nextBranch = null
    oppositeBranch = null

    if queryPoint[axis] < node.point[axis]:
        nextBranch = node.left
        oppositeBranch = node.right
    else:
        nextBranch = node.right
        oppositeBranch = node.left

    best = closerDistance(
        kdTreeNN(queryPoint, nextBranch, depth + 1),
        node.point,
        queryPoint
    )

    if distanceAlongAxis(queryPoint, node.point, axis) < distance(queryPoint, best):
        best = closerDistance(
            kdTreeNN(queryPoint, oppositeBranch, depth + 1),
            best,
            queryPoint
        )

    return best
`}
        </pre>

        <p>Where <InlineMath math="\text{distance}" /> computes Euclidean distance and <InlineMath math="\text{closerDistance}" /> returns the closer of two points to the query.</p>
      </section>

      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Efficiency Analysis</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Construction Time:</strong> <InlineMath math="O(n \log n)" /> for <InlineMath math="n" /> videos, due to median splits.
          </li>
          <li>
            <strong>Query Time:</strong> Average <InlineMath math="O(\log n)" /> for nearest neighbor searches, efficient for real-time recommendations.
          </li>
          <li>
            <strong>Memory:</strong> <InlineMath math="O(n)" /> to store embeddings and KD-Tree nodes.
          </li>
          <li>
            <strong>Scalability:</strong> Efficient for moderate dimensionality (<InlineMath math="d \leq 20" />). For very high dimensions, approximate methods may be needed.
          </li>
          <li>
            <strong>Dynamic Updates:</strong> KD-Tree can be rebuilt periodically or use balanced tree variants for frequent insertions.
          </li>
        </ul>
      </section>
    </div>
  );
}
