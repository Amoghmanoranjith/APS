import React from "react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import cdnFlow from "/assets/bc5.png"; // Replace with actual path to your diagram

export default function BusinessCase5() {
  return (
    <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8 dark:prose-invert">
      <h1 className="mb-4 font-extrabold text-4xl">
        Identifying CDN Bottlenecks Using Max-Flow with Ford-Fulkerson
      </h1>

      <br />
      <br />
      <div className="w-full max-w-3xl mx-auto mb-8">
        <img
          src={cdnFlow}
          alt="CDN Flow Bottleneck Detection"
          className="w-full h-auto"
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />
      </div>
      <br />
      <br />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Motivation</h2>
        <p>
          In a Content Delivery Network (CDN), data travels from origin servers (sources) to edge servers (sinks) through intermediary caching and routing nodes.
        </p>
        <p>
          Each link in this network has a maximum bandwidth capacity. Identifying bottlenecks—edges limiting overall flow—is crucial to improving CDN throughput and latency.
        </p>
        <p>
          By modeling the CDN as a flow network and applying the Ford-Fulkerson algorithm, we can compute the maximum flow and identify which edges constrain it most. These become targets for bandwidth upgrades.
        </p>
      </section>

      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">System Design</h2>
        <ul className="list-disc list-inside">
          <li>
            Represent the CDN as a directed graph <InlineMath math="G = (V, E)" /> where:
            <ul className="list-disc list-inside ml-6">
              <li>Vertices: CDN nodes (origin, cache, edge)</li>
              <li>Edges: Network links with max bandwidth as capacity</li>
            </ul>
          </li>
          <li>
            Designate the origin server as the <strong>source</strong> and edge server(s) as the <strong>sink</strong>.
          </li>
          <li>
            Apply <strong>Ford-Fulkerson</strong> to determine the <strong>maximum flow</strong> from source to sink.
          </li>
          <li>
            Identify <strong>critical edges</strong>—edges that are fully utilized in the max flow. These are bottlenecks.
          </li>
          <li>
            Strategically upgrade the capacity of these edges to boost end-to-end data flow.
          </li>
        </ul>
      </section>

      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Algorithm: Ford-Fulkerson</h2>
        <p>
          The algorithm repeatedly finds augmenting paths from source to sink and increases flow along these paths until no more exist.
        </p>
        <pre className="p-4 rounded overflow-x-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
{`function fordFulkerson(G, source, sink):
    flow = 0
    while path = findAugmentingPath(G, source, sink):
        minCapacity = minimum capacity along path
        for edge in path:
            reduce forward capacity
            increase reverse capacity
        flow += minCapacity
    return flow`}
        </pre>

        <p>
          The augmenting path can be found using DFS or BFS (in Edmonds-Karp variant). The residual graph is updated after each iteration.
        </p>

        <BlockMath math="\\text{Max Flow} = \\sum_{v \\in V} f(s, v)" />
      </section>

      <hr className="my-8 border-gray-300 dark:border-gray-600" />

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Efficiency Analysis</h2>
        <ul className="list-disc list-inside">
          <li><strong>Time Complexity:</strong> <InlineMath math="O(E \cdot \text{max\_flow})" /> using DFS, or <InlineMath math="O(VE^2)" /> using BFS (Edmonds-Karp).</li>
          <li><strong>Space:</strong> <InlineMath math="O(V + E)" /> for storing the graph and residual capacities.</li>
          <li><strong>Insight:</strong> Bottlenecks are edges where the capacity is fully utilized in the final residual graph.</li>
          <li><strong>Scalability:</strong> Efficient for moderate-size CDN graphs. For very large CDNs, heuristics or incremental flow updates may be used.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 font-extrabold text-2xl">Inferences</h2>
        <ul className="list-disc list-inside">
          <li><strong>Data-driven:</strong> Focuses bandwidth investment on links proven to be bottlenecks.</li>
          <li><strong>Adaptable:</strong> Works as topology changes or new regions are added to the CDN.</li>
          <li><strong>Optimized Scaling:</strong> Prevents overprovisioning by guiding upgrades precisely.</li>
        </ul>
      </section>
    </div>
  );
}
