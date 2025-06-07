import React from "react";
import bc1 from "/assets/bc1.excalidraw.svg"; // Adjust path accordingly
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function BusinessCase1() {
  return (
    <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8 dark:prose-invert">
      <h1 className="mb-4 font-extrabold text-4xl">
        Low latency pre-fetching of hot Videos in a Locality
      </h1>
      <br />
      <br />
      <div className="w-full max-w-3xl mx-auto mb-8">
        <img
          src={bc1}
          alt="Misra-Gries Algorithm Diagram"
          className="w-full h-auto"
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />
      </div>

      <br />
      <br />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Motivation</h2>

        <p>
          All views for a video first go through an edge server of its respective region before eventually reaching the origin servers for storage and most importantly backend analytics to determine hot videos in a region and cache them in the respective edge servers.
        </p>
        <br />
        <p>
          What if the edge nodes did some processing to determine the hot videos for their regions and request them for caching in the origin servers?
        </p>
        <br />
        <p>
          This idea has the potential to reduce latency, provide better results than
        </p>
      </section>
      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">System Context</h2>
        <ul className="list-disc list-inside">
          <li>CDN edge servers receive deduped views from users in their locality.</li>
          <li>Edge servers locally estimate the top-<i>k</i> trending videos using the MG algorithm.</li>
          <li>After determining these videos, requests are sent to the origin server for caching these videos</li>
          <li>The requests received are sent in batches periodically to the origin servers for analytics</li>
          <li>Edge servers:
            <ul className="list-disc list-inside ml-6">
              <li>Collect deduped requests for a video </li>
              <li>Perform MG locally to detect regional popularity.</li>
              <li>Cache popular videos and periodically update the origin server.</li>
            </ul>
          </li>
        </ul>
      </section>
      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Problem Statement</h2>
        <p>We aim to report videos whose view frequency exceeds:</p>
        <pre className="text-lg bg-gray-100 dark:bg-white p-3 rounded">frequency &gt; m / k</pre>
        <p>Where:</p>
        <ul className="list-disc list-inside">
          <li><strong>m</strong>: total number of views</li>
          <li><strong>n</strong>: number of distinct video IDs</li>
          <li><strong>k</strong>: number of maintained counters (accuracy-performance control)</li>
        </ul>
      </section>
      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Misra–Gries Frequency Estimation</h2>
        <p><strong>Parameters:</strong></p>
        <ul className="list-disc list-inside">
          <li><strong>ε</strong>: error bound</li>
          <li><strong>δ</strong>: failure probability</li>
          <li><strong>σ</strong>: token stream</li>
          <li><strong>A(σ)</strong>: estimated frequency function</li>
          <li><strong>ϕ(σ)</strong>: actual frequency function</li>
        </ul>

        <p><strong>Initialization:</strong></p>
        <ul className="list-disc list-inside">

          <li>a<strong> counter</strong> is a key(video ID)/value(number of views) pair</li>
          <li><strong>m</strong> the length of a video ID</li>
          <li><strong>n</strong> total number of views received</li>
          <li><strong>A</strong>: associative array (balanced BST) to hold these counters</li>
          <li><strong>k - 1</strong>: max counters maintained</li>
        </ul>
      </section>
      <hr className="my-8 border-gray-300 dark:border-gray-600" />


      <h2 className="mb-2 font-extrabold text-2xl">Efficiency analysis</h2>
      <ul className="list-disc list-inside">
        <li>
          Each key requires <InlineMath math="\lceil \log m \rceil" /> bits to store
        </li>
        <li>
          Each value requires <InlineMath math="\lceil \log n \rceil" /> bits to store
        </li>
        <li>
          Since there are at most <InlineMath math="k - 1" /> counters at any given time, the total space required is <InlineMath math="\mathcal{O}\left(k(\log m + \log n)\right)" />
        </li>
      </ul>



      <hr className="my-8 border-gray-300 dark:border-gray-600" />
      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">MG Algorithm</h2>
        <pre className="p-4 rounded overflow-x-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
          {`Algorithm 1: Misra–Gries Frequency Estimation

Initialize:
    A ← empty associative array

Process(token j):
    if j ∈ keys(A):
        A[j] ← A[j] + 1
    else if |keys(A)| < k - 1:
        A[j] ← 1
    else:
        for each ℓ ∈ keys(A):
            A[ℓ] ← A[ℓ] - 1
            if A[ℓ] == 0:
                remove ℓ from A

Output(query a):
    if a ∈ keys(A):
        report f̂ₐ = A[a]
    else:
        report f̂ₐ = 0`}
        </pre>
      </section>
      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Inferences</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Space-efficient</strong>: Only maintains <InlineMath math="k - 1" /> counters.
          </li>
          <li>
            <strong>Streaming-compatible</strong>: Single-pass algorithm ideal for real-time token processing.
          </li>
          <li>
            <strong>Guaranteed error bounds</strong>: Additive error bounded by ε <InlineMath math=" \leq \frac{1}{k + 1}" />.
          </li>
          <li>
            <strong>Origin load reduction</strong>: Shifts trend detection to edge nodes, reducing centralized compute demand.
          </li>
          <li>
            <strong>Lower detection latency</strong>: Popular videos (with local frequency
            <InlineMath math="\phi(v) \geq \frac{m}{k}" />) are detected earlier than traditional backend-based analytics.
          </li>
          <li>
            <strong>View count robustness</strong>: View frequency is a more reliable indicator of localized virality than raw request rate, which may include retries, bot traffic, or partial loads.
          </li>
        </ul>
      </section>

      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section>
        <h2 className="mb-2 font-extrabold text-2xl">Conclusion</h2>
        <p>
          This design offloads computational pressure from centralized infrastructure and enables real-time local trend detection. When paired with caching, it enhances performance and user experience with minimal backend strain.
        </p>
      </section>
    </div>
  );
}
