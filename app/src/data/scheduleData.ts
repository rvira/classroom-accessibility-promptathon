import type { ScheduledClass, DateStripItem, SubjectCategory } from '../types'

export const CURRENT_DATE_KEY = '2026-11-21'

export const DATE_STRIP_ITEMS: DateStripItem[] = [
  {
    dateKey: '2026-11-19',
    displayDay: 'Wed',
    displayDate: 'Nov 19',
    fullLabel: 'Wednesday, November 19, 2026',
    relativeLabel: '2 Days Ago',
    isCurrentDate: false,
    offsetFromCurrent: -2,
    classCount: 3,
    compsciCount: 2,
  },
  {
    dateKey: '2026-11-20',
    displayDay: 'Thu',
    displayDate: 'Nov 20',
    fullLabel: 'Thursday, November 20, 2026',
    relativeLabel: 'Yesterday',
    isCurrentDate: false,
    offsetFromCurrent: -1,
    classCount: 3,
    compsciCount: 2,
  },
  {
    dateKey: '2026-11-21',
    displayDay: 'Fri',
    displayDate: 'Nov 21',
    fullLabel: 'Friday, November 21, 2026',
    relativeLabel: 'Today · Live / Ongoing Session',
    isCurrentDate: true,
    offsetFromCurrent: 0,
    classCount: 4,
    compsciCount: 3,
  },
  {
    dateKey: '2026-11-22',
    displayDay: 'Sat',
    displayDate: 'Nov 22',
    fullLabel: 'Saturday, November 22, 2026',
    relativeLabel: 'Tomorrow',
    isCurrentDate: false,
    offsetFromCurrent: 1,
    classCount: 2,
    compsciCount: 2,
  },
  {
    dateKey: '2026-11-23',
    displayDay: 'Sun',
    displayDate: 'Nov 23',
    fullLabel: 'Sunday, November 23, 2026',
    relativeLabel: 'In 2 Days',
    isCurrentDate: false,
    offsetFromCurrent: 2,
    classCount: 2,
    compsciCount: 2,
  },
]

export const SCHEDULE_DATA: Record<string, ScheduledClass[]> = {
  // ==========================================
  // WEDNESDAY NOV 19, 2026 (currentDate - 2)
  // ==========================================
  '2026-11-19': [
    {
      id: 'cs161-nov19',
      code: 'COMPSCI 161',
      subject: 'compsci',
      title: 'Design and Analysis of Algorithms',
      time: '5:00 PM – 5:50 PM',
      location: 'ICS 174',
      topic: 'Greedy Choice Property: Interval Scheduling & Proofs',
      instructor: {
        name: 'Prof. Michael Shindler',
        title: 'Associate Professor of Teaching',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'm.shindler@uci.edu',
        office: 'DBH 4022',
        officeHours: 'Tue/Thu 1:00 PM – 2:30 PM (DBH 4022)',
        bio: 'Specializing in computer science pedagogy, data structures, and randomized and greedy algorithms.',
        avatarInitials: 'MS',
      },
      isLive: false,
      canvasSync: 'Homework 4 Graded (Score: 96/100)',
      streamUrl: 'https://uci.zoom.us/j/9482019482',
      recordingUrl: 'https://uci.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=cs161-nov19',
      outline: {
        unit: 'Greedy Algorithms & Interval Scheduling',
        summary: 'Proving greedy choice never falls behind in optimal interval selection.',
        keyConcepts: [
          'Earliest finish time first strategy',
          'Inductive proof by contradiction (Greedy Stays Ahead)',
          'O(n log n) sorting bounds vs O(n) scan time',
        ],
        reading: 'Kleinberg & Tardos · Algorithm Design Ch 4.1–4.2',
        assignments: 'Homework 4 (Complete) · Problem Set 5 Released',
        rubricConstraint: 'Provide mathematical induction base case for earliest finish interval.',
        officeHours: 'TA Jessica Vance · Wed 3:00 PM (ICS 248)',
      },
      syllabusNotes: {
        overview: 'Greedy algorithms construct solutions piece by piece, always choosing the immediate next piece that offers the most obvious benefit.',
        prerequisites: 'Asymptotic notation (Big-O), induction proofs, recursion trees.',
        coreTopics: ['Interval Scheduling', 'Interval Partitioning', 'Scheduling to Minimize Lateness'],
        codeSnippets: [
          {
            language: 'python',
            filename: 'interval_scheduling.py',
            code: `def schedule_intervals(intervals):
    # Sort by finish time: intervals = [(start, end, id), ...]
    sorted_intervals = sorted(intervals, key=lambda x: x[1])
    selected = []
    last_finish = -float('inf')
    for start, finish, name in sorted_intervals:
        if start >= last_finish:
            selected.append(name)
            last_finish = finish
    return selected`,
          },
        ],
      },
      downloads: [
        {
          id: 'dl-1',
          name: 'Lecture 12 Slides: Greedy Scheduling (PDF)',
          size: '3.4 MB',
          type: 'pdf',
          description: 'Official lecture slide deck with step-by-step visual intervals.',
          downloadName: 'CS161_Lecture12_Greedy.pdf',
        },
      ],
      discussionThreads: [
        {
          id: 'dt-1',
          author: 'David Kim',
          role: 'Student',
          timeAgo: '2 days ago',
          title: 'Tie-breaking in earliest finish time',
          question: 'Does the tie-breaking rule between identical finish times affect optimality?',
          stepTag: 'Step 1: Sorting',
          upvotes: 4,
          answer: {
            author: 'TA Jessica Vance',
            role: 'TA',
            text: 'No, any tie-breaking rule among equal finish times preserves the Greedy Stays Ahead invariant.',
            endorsed: true,
          },
        },
      ],
    },
    {
      id: 'cs132-nov19',
      code: 'COMPSCI 132',
      subject: 'compsci',
      title: 'Computer Networks',
      time: '11:00 AM – 12:20 PM',
      location: 'DBH 1420',
      topic: 'Transport Layer: TCP Congestion Control & AIMD',
      instructor: {
        name: 'Prof. Magda El Zarki',
        title: 'Professor of Computer Science',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'elzarki@uci.edu',
        office: 'DBH 3218',
        officeHours: 'Mon/Wed 1:30 PM (DBH 3218)',
        bio: 'Researching multimedia networking, wireless communications, and virtual world architectures.',
        avatarInitials: 'ME',
      },
      isLive: false,
      canvasSync: 'Socket Programming Lab 2 Due Today',
      streamUrl: 'https://uci.zoom.us/j/9182301982',
      outline: {
        unit: 'TCP Congestion Control',
        summary: 'Additive Increase Multiplicative Decrease (AIMD) algorithm and slow start.',
        keyConcepts: ['Congestion Window (cwnd)', 'Slow Start threshold (ssthresh)', 'Fast Retransmit & Recovery'],
        reading: 'Kurose & Ross · Computer Networking Ch 3.6',
        assignments: 'Lab 2 (Submitted 10:59 AM)',
        rubricConstraint: 'Document socket timeout handlers cleanly.',
        officeHours: 'Prof. El Zarki · Wed 1:30 PM',
      },
      syllabusNotes: {
        overview: 'End-to-end congestion control mechanism regulating packet injection rate.',
        prerequisites: 'Socket API, IP addressing, TCP handshake.',
        coreTopics: ['AIMD', 'TCP Tahoe vs Reno', 'CUBIC and BBR variants'],
        codeSnippets: [],
      },
      downloads: [],
      discussionThreads: [],
    },
    {
      id: 'math2b-nov19',
      code: 'MATH 2B',
      subject: 'math',
      title: 'Calculus II · Lecture 13',
      time: '10:00 AM – 10:50 AM',
      location: 'Rowland Hall 101',
      topic: 'Indefinite Integrals with Algebraic Substitution',
      instructor: {
        name: 'Prof. Chen',
        title: 'Lecturer in Mathematics',
        department: 'School of Physical Sciences, UC Irvine',
        email: 'chen.math@uci.edu',
        office: 'Rowland Hall 214',
        officeHours: 'Mon/Wed 2:00 PM',
        bio: 'Focused on undergraduate calculus pedagogy and active learning strategies.',
        avatarInitials: 'PC',
      },
      isLive: false,
      canvasSync: 'Worksheet 13 Submitted',
      streamUrl: 'https://uci.zoom.us/j/9912093847',
      outline: {
        unit: 'Algebraic Substitution',
        summary: 'Simplifying algebraic expressions prior to u-substitution.',
        keyConcepts: ['Completing the square', 'Back-substitution', 'Trig identity preprocessing'],
        reading: 'Stewart Calculus · Sec 5.5',
        assignments: 'Worksheet 13 (Done)',
        rubricConstraint: 'Show step-by-step algebra on paper.',
        officeHours: 'Prof. Chen · Mon/Wed 2:00 PM',
      },
      syllabusNotes: {
        overview: 'Techniques for rewriting algebraic fractions before applying substitution rules.',
        prerequisites: 'Basic polynomial differentiation, chain rule.',
        coreTopics: ['Fraction decomposition', 'Completing squares'],
        codeSnippets: [],
      },
      downloads: [],
      discussionThreads: [],
    },
  ],

  // ==========================================
  // THURSDAY NOV 20, 2026 (currentDate - 1)
  // ==========================================
  '2026-11-20': [
    {
      id: 'cs161-nov20',
      code: 'COMPSCI 161',
      subject: 'compsci',
      title: 'Design and Analysis of Algorithms',
      time: '3:30 PM – 4:50 PM',
      location: 'Donald Bren Hall 1100',
      topic: 'Dynamic Programming: Intro, Memoization & DAGs',
      instructor: {
        name: 'Prof. Michael Shindler',
        title: 'Associate Professor of Teaching',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'm.shindler@uci.edu',
        office: 'DBH 4022',
        officeHours: 'Tue/Thu 1:00 PM – 2:30 PM (DBH 4022)',
        bio: 'Specializing in computer science pedagogy, data structures, and randomized and greedy algorithms.',
        avatarInitials: 'MS',
      },
      isLive: false,
      canvasSync: 'Quiz 4 Prep Available on Canvas',
      streamUrl: 'https://uci.zoom.us/j/9482019482',
      recordingUrl: 'https://uci.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=cs161-nov20',
      outline: {
        unit: 'Dynamic Programming Foundations',
        summary: 'Formulating overlapping subproblems as paths in a Directed Acyclic Graph.',
        keyConcepts: [
          'Memoization (top-down) vs Tabulation (bottom-up)',
          'Subproblem DAG topological ordering',
          'Fibonacci & Longest Increasing Subsequence (LIS)',
        ],
        reading: 'Kleinberg & Tardos · Algorithm Design Ch 6.1–6.2',
        assignments: 'Quiz 4 Practice (Canvas)',
        rubricConstraint: 'Explicitly specify the base cases and table dimensions.',
        officeHours: 'Prof. Shindler · Thu 1:00 PM (DBH 4022)',
      },
      syllabusNotes: {
        overview: 'Dynamic programming replaces exponential recursive tree expansion with polynomial time table lookups.',
        prerequisites: 'Recursion trees, Big-O analysis, DAG topological sort.',
        coreTopics: ['Memoization cache', 'Bottom-up iteration', 'Reconstructing the optimal solution'],
        codeSnippets: [
          {
            language: 'python',
            filename: 'lis_memoized.py',
            code: `def length_of_lis(nums):
    if not nums: return 0
    # dp[i] = length of LIS ending at index i
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
          },
        ],
      },
      downloads: [
        {
          id: 'dl-2',
          name: 'Lecture 13 Slides: Dynamic Programming Intro (PDF)',
          size: '4.1 MB',
          type: 'pdf',
          description: 'Top-down memoization vs bottom-up tabulation comparison.',
          downloadName: 'CS161_Lecture13_DP_Intro.pdf',
        },
      ],
      discussionThreads: [
        {
          id: 'dt-2',
          author: 'Priya Patel',
          role: 'Student',
          timeAgo: 'Yesterday',
          title: 'Memory overhead of top-down vs bottom-up',
          question: 'Does top-down recursion stack ever risk stack overflow on large inputs in Python?',
          stepTag: 'Step 2: Memoization',
          upvotes: 6,
          answer: {
            author: 'Prof. Michael Shindler',
            role: 'Instructor',
            text: 'Yes! Python defaults to a recursion limit of 1000. In production algorithms, iterative bottom-up tabulation is strongly preferred.',
            endorsed: true,
          },
        },
      ],
    },
    {
      id: 'cs171-nov20',
      code: 'COMPSCI 171',
      subject: 'compsci',
      title: 'Introduction to Artificial Intelligence',
      time: '1:00 PM – 2:20 PM',
      location: 'ICS 174',
      topic: 'Informed Search: A* Algorithm & Admissible Heuristics',
      instructor: {
        name: 'Prof. Sameer Singh',
        title: 'Associate Professor of Computer Science',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'sameer@uci.edu',
        office: 'DBH 4212',
        officeHours: 'Thu 3:00 PM',
        bio: 'Researching robustness and interpretability in NLP and Machine Learning models.',
        avatarInitials: 'SS',
      },
      isLive: false,
      canvasSync: 'Project 2 (Search Agents) Released',
      streamUrl: 'https://uci.zoom.us/j/9348123982',
      outline: {
        unit: 'Informed State-Space Search',
        summary: 'Guiding search trees using cost f(n) = g(n) + h(n).',
        keyConcepts: ['Admissibility: h(n) <= h*(n)', 'Consistency / Monotonicity', 'Proof of A* Optimality'],
        reading: 'Russell & Norvig · AIMA 4th Ed Ch 3.5–3.6',
        assignments: 'Project 2 Search Agents (Due Dec 2)',
        rubricConstraint: 'Prove heuristic is admissible prior to submission.',
        officeHours: 'Prof. Sameer Singh · Thu 3:00 PM',
      },
      syllabusNotes: {
        overview: 'A* search algorithm balances path cost g(n) with estimated remaining cost h(n).',
        prerequisites: 'Graph representations, Priority Queues (Min-Heap).',
        coreTopics: ['A* Algorithm', 'Manhattan vs Euclidean heuristics'],
        codeSnippets: [],
      },
      downloads: [],
      discussionThreads: [],
    },
    {
      id: 'phys7c-nov20',
      code: 'PHYS 7C',
      subject: 'physics',
      title: 'Classical Mechanics · Lecture 8',
      time: '10:00 AM – 11:20 AM',
      location: 'PSLH 120',
      topic: 'Driven Oscillations, Quality Factor (Q) & Resonance',
      instructor: {
        name: 'Prof. Robertson',
        title: 'Professor of Physics & Astronomy',
        department: 'School of Physical Sciences, UC Irvine',
        email: 'robertson@uci.edu',
        office: 'PSLH 142',
        officeHours: 'Tue/Thu 11:30 AM',
        bio: 'Researching theoretical astrophysics, galactic dynamics, and orbital mechanics.',
        avatarInitials: 'PR',
      },
      isLive: false,
      canvasSync: 'Homework 4 Graded',
      streamUrl: 'https://uci.zoom.us/j/9283912093',
      outline: {
        unit: 'Resonance and Damping',
        summary: 'Frequency response curves and resonance peak sharpening.',
        keyConcepts: ['Resonant frequency omega_0', 'Quality factor Q', 'Power dissipation'],
        reading: 'Giancoli Physics · Ch 14.7',
        assignments: 'Homework 5 Due Next Tuesday',
        rubricConstraint: 'Always state standard SI units on final values.',
        officeHours: 'Prof. Robertson · Thu 11:30 AM',
      },
      syllabusNotes: {
        overview: 'Second-order differential equations modeling forced mechanical oscillators.',
        prerequisites: 'Harmonic oscillator differential equations, complex exponentials.',
        coreTopics: ['Amplitude response', 'Phase lag across resonance'],
        codeSnippets: [],
      },
      downloads: [],
      discussionThreads: [],
    },
  ],

  // ==========================================
  // FRIDAY NOV 21, 2026 (currentDate - LIVE ONGOING)
  // ==========================================
  '2026-11-21': [
    {
      id: 'cs161-nov21',
      code: 'COMPSCI 161',
      subject: 'compsci',
      title: 'Design and Analysis of Algorithms',
      time: '3:30 PM – 4:50 PM',
      location: 'Donald Bren Hall 1100',
      topic: 'Dynamic Programming: Bellman-Ford & Negative Cycles',
      instructor: {
        name: 'Prof. Michael Shindler',
        title: 'Associate Professor of Teaching',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'm.shindler@uci.edu',
        office: 'DBH 4022',
        officeHours: 'Tue/Thu 1:00 PM – 2:30 PM (DBH 4022)',
        bio: 'Specializing in computer science pedagogy, data structures, and randomized and greedy algorithms.',
        avatarInitials: 'MS',
      },
      isLive: true,
      isOngoingToday: true,
      canvasSync: 'In-Class Checkpoint #4 (Due 4:50 PM Today)',
      streamUrl: 'https://uci.zoom.us/j/9482019482',
      recordingUrl: 'https://uci.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=cs161-live-nov21',
      outline: {
        unit: 'Single-Source Shortest Paths (Bellman-Ford)',
        summary: 'Dynamic programming formulation for graphs with negative edge weights and cycle detection.',
        keyConcepts: [
          'Optimal Substructure: OPT(i, v) = min path using <= i edges',
          'Recurrence: OPT(i, v) = min(OPT(i-1, v), min_(u,v){OPT(i-1, u) + c_uv})',
          'Space optimization from O(V²) down to O(V) via in-place distance relaxation',
          'Negative cycle detection: relaxation succeeds on the V-th iteration',
        ],
        reading: 'Kleinberg & Tardos · Algorithm Design Ch 6.8 · CLRS Ch 24.1',
        assignments: 'In-Class Checkpoint #4 (Canvas synced · Due 4:50 PM today)',
        rubricConstraint: 'Exact edge relaxations required. State the time complexity proof explicitly: O(V · E).',
        officeHours: 'Prof. Shindler · Today immediately after lecture in DBH 1100',
      },
      syllabusNotes: {
        overview: 'Dijkstra fails when edge weights are negative because greedy decisions cannot be revoked. Bellman-Ford applies Dynamic Programming to guarantee correct shortest paths in O(V · E) time.',
        prerequisites: 'Adjacency list representations, Dijkstra algorithm, directed graphs with cycle detection.',
        coreTopics: [
          'Bellman-Ford Recurrence Formulation',
          'The V-1 Edge Bound Principle',
          'Negative Weight Cycle Detection & Arbitrage',
          'Space Optimization via Predecessor Arrays',
        ],
        codeSnippets: [
          {
            language: 'python',
            filename: 'bellman_ford_production.py',
            code: `def bellman_ford(vertices, edges, source):
    """
    Computes single-source shortest paths on directed graph G = (V, E).
    Returns (dist, has_negative_cycle) in O(V * E) time.
    """
    dist = {v: float('inf') for v in vertices}
    pred = {v: None for v in vertices}
    dist[source] = 0

    # Step 1: Relax all edges |V| - 1 times
    for i in range(len(vertices) - 1):
        relaxed = False
        for u, v, weight in edges:
            if dist[u] != float('inf') and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                pred[v] = u
                relaxed = True
        if not relaxed:
            break  # Early termination optimization!

    # Step 2: Check for negative-weight cycles
    has_negative_cycle = False
    for u, v, weight in edges:
        if dist[u] != float('inf') and dist[u] + weight < dist[v]:
            has_negative_cycle = True
            break

    return dist, pred, has_negative_cycle`,
          },
        ],
        asciiDiagram: `
Bellman-Ford Recurrence Matrix:
   v1    v2    v3    v4    v5
i=0 [  0,  inf,  inf,  inf,  inf ]  <- Initial source dist
i=1 [  0,   -1,    4,  inf,  inf ]  <- Relax 1-edge paths
i=2 [  0,   -1,    2,    5,  inf ]  <- Relax 2-edge paths
i=3 [  0,   -1,    2,    1,    3 ]  <- Converged!
        `,
      },
      downloads: [
        {
          id: 'dl-cs1',
          name: 'Lecture 14 Slides: Bellman-Ford & Negative Cycles (PDF)',
          size: '5.2 MB',
          type: 'pdf',
          description: 'Official slide deck with full recurrence proofs and graph diagrams.',
          downloadName: 'CS161_Lecture14_Bellman_Ford.pdf',
        },
        {
          id: 'dl-cs2',
          name: 'Starter Code: bellman_ford.py',
          size: '18 KB',
          type: 'code',
          description: 'Python template with adjacency list parser, unit tests, and graph visualizer.',
          downloadName: 'bellman_ford_starter.py',
        },
        {
          id: 'dl-cs3',
          name: 'Canvas Checkpoint Worksheet #4 (PDF)',
          size: '412 KB',
          type: 'worksheet',
          description: 'Classroom worksheet containing the 5-node test graph for today\'s in-class credit.',
          downloadName: 'CS161_Lab4_Worksheet.pdf',
        },
      ],
      discussionThreads: [
        {
          id: 'dt-live-1',
          author: 'Maya Lin',
          role: 'Student',
          timeAgo: '12 mins ago',
          title: 'Why exactly |V| - 1 iterations?',
          question: 'Why can a shortest simple path in an n-node graph contain at most n-1 edges?',
          stepTag: 'Step 1: Recurrence Formulation',
          upvotes: 11,
          answer: {
            author: 'Prof. Michael Shindler',
            role: 'Instructor',
            text: 'A simple path visits each vertex at most once. If a path visited n or more edges, by the Pigeonhole Principle at least one vertex would be visited twice, forming a cycle! If the cycle is positive or zero weight, removing it yields a shorter or equal path.',
            endorsed: true,
          },
        },
        {
          id: 'dt-live-2',
          author: 'Kevin Zhang',
          role: 'Student',
          timeAgo: '5 mins ago',
          title: 'Early termination on non-relaxed passes',
          question: 'If no distance changes during iteration 3, can we safely terminate early?',
          stepTag: 'Step 2: Relaxation Loop',
          upvotes: 7,
          answer: {
            author: 'TA Alex Rivera',
            role: 'TA',
            text: 'Yes! If an entire iteration passes with zero successful relaxations, no subsequent iteration can ever discover a shorter path. You can break immediately.',
            endorsed: true,
          },
        },
      ],
    },
    {
      id: 'cs143a-nov21',
      code: 'COMPSCI 143A',
      subject: 'compsci',
      title: 'Principles of Operating Systems',
      time: '11:00 AM – 12:20 PM',
      location: 'PSLH 120',
      topic: 'Virtual Memory: Page Replacement & TLB Thrashing',
      instructor: {
        name: 'Prof. Ian Harris',
        title: 'Professor of Computer Science',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'harris@uci.edu',
        office: 'DBH 3088',
        officeHours: 'Fri 1:00 PM – 2:30 PM',
        bio: 'Researching hardware verification, embedded systems, and secure OS architectures.',
        avatarInitials: 'IH',
      },
      isLive: false,
      canvasSync: 'Lab 3 Kernel Paging Due Today 11:59 PM',
      streamUrl: 'https://uci.zoom.us/j/9384912837',
      outline: {
        unit: 'Paging & Memory Management',
        summary: 'Translation Lookaside Buffers (TLB), multi-level page tables, and LRU eviction.',
        keyConcepts: ['Page hit/miss latency', 'Working Set Model', 'Thrashing prevention algorithms'],
        reading: 'Silberschatz · Operating System Concepts Ch 9',
        assignments: 'Lab 3 Paging Kernel (Due Tonight)',
        rubricConstraint: 'Implement TLB invalidation during context switch.',
        officeHours: 'Prof. Harris · Fri 1:00 PM',
      },
      syllabusNotes: {
        overview: 'Virtual memory isolates processes and creates the illusion of infinite contiguous address spaces.',
        prerequisites: 'C programming, pointers, CPU registers, MMU.',
        coreTopics: ['Page Tables', 'TLB', 'Page Replacement Algorithms (FIFO, LRU, Clock)'],
        codeSnippets: [],
      },
      downloads: [
        {
          id: 'dl-cs143-1',
          name: 'Lecture 11: Virtual Memory Slides (PDF)',
          size: '4.8 MB',
          type: 'pdf',
          description: 'Hardware MMU translation walkthrough.',
          downloadName: 'CS143A_Lecture11_VM.pdf',
        },
      ],
      discussionThreads: [],
    },
    {
      id: 'cs122a-nov21',
      code: 'COMPSCI 122A',
      subject: 'compsci',
      title: 'Introduction to Data Management',
      time: '1:00 PM – 2:20 PM',
      location: 'Rowland Hall 101',
      topic: 'Relational Algebra: Joins, Projections & SQL Translation',
      instructor: {
        name: 'Prof. Chen Li',
        title: 'Professor of Computer Science',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'chenli@uci.edu',
        office: 'DBH 2092',
        officeHours: 'Mon/Fri 2:30 PM',
        bio: 'Researching data management, query optimization, spatial and text databases.',
        avatarInitials: 'CL',
      },
      isLive: false,
      canvasSync: 'Homework 3 (SQL Relational Algebra) Open',
      streamUrl: 'https://uci.zoom.us/j/9812938471',
      outline: {
        unit: 'Relational Algebra',
        summary: 'Formal query language providing mathematical foundation for SQL engines.',
        keyConcepts: ['Select (sigma)', 'Project (pi)', 'Natural Join (bowtie)', 'Equivalence transformations'],
        reading: 'Ramakrishnan & Gehrke · Database Management Systems Ch 4',
        assignments: 'Homework 3 (Due Nov 25)',
        rubricConstraint: 'Express queries strictly in mathematical operator notation.',
        officeHours: 'Prof. Chen Li · Fri 2:30 PM',
      },
      syllabusNotes: {
        overview: 'Theoretical query algebra used by SQL query optimizers to find efficient execution trees.',
        prerequisites: 'Set theory, discrete mathematics, relational model.',
        coreTopics: ['Selection', 'Projection', 'Cartesian Product', 'Theta Join'],
        codeSnippets: [],
      },
      downloads: [],
      discussionThreads: [],
    },
    {
      id: 'math2b-nov21',
      code: 'MATH 2B',
      subject: 'math',
      title: 'Calculus II · Lecture 14',
      time: '10:00 AM – 10:50 AM',
      location: 'Rowland Hall 101',
      topic: 'Definite Integrals via u-substitution & Variable Bounds',
      instructor: {
        name: 'Prof. Chen',
        title: 'Lecturer in Mathematics',
        department: 'School of Physical Sciences, UC Irvine',
        email: 'chen.math@uci.edu',
        office: 'Rowland Hall 214',
        officeHours: 'Mon/Wed/Fri 2:00 PM',
        bio: 'Focused on undergraduate calculus pedagogy and active learning strategies.',
        avatarInitials: 'PC',
      },
      isLive: false,
      isOngoingToday: false,
      canvasSync: 'Lab 14 Worksheet (Due Today 10:50 AM)',
      streamUrl: 'https://uci.zoom.us/j/9912093847',
      outline: {
        unit: 'Definite Integrals & Boundary Transformations',
        summary: 'Transforming integration limits from x to u so back-substitution is unnecessary.',
        keyConcepts: [
          'Direct boundary calculation: u(0) and u(4)',
          'Eliminating back-substitution overhead',
          'Exact fractions required by Canvas rubric',
        ],
        reading: 'Stewart Calculus · Sec 5.5',
        assignments: 'Lab 14 Worksheet (Canvas synced · Due 10:50 AM)',
        rubricConstraint: 'Exact numbers only: write exact fractions; no rounded decimals.',
        officeHours: 'Prof. Chen · Today 2:00 PM',
      },
      syllabusNotes: {
        overview: 'Definite integrals evaluate across boundaries of the active variable.',
        prerequisites: 'Chain rule, substitution for indefinite integrals.',
        coreTopics: ['Boundary transformation', 'Symmetric integrals'],
        codeSnippets: [],
      },
      downloads: [],
      discussionThreads: [],
    },
  ],

  // ==========================================
  // SATURDAY NOV 22, 2026 (currentDate + 1)
  // ==========================================
  '2026-11-22': [
    {
      id: 'cs161-nov22',
      code: 'COMPSCI 161',
      subject: 'compsci',
      title: 'Algorithms Weekend Recitation & Office Hours',
      time: '10:00 AM – 11:30 AM',
      location: 'Online Virtual Hall (Zoom)',
      topic: 'Midterm 2 Preparation: Divide & Conquer vs Dynamic Programming',
      instructor: {
        name: 'Prof. Michael Shindler',
        title: 'Associate Professor of Teaching',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'm.shindler@uci.edu',
        office: 'DBH 4022',
        officeHours: 'Special Weekend Midterm Clinic',
        bio: 'Specializing in computer science pedagogy, data structures, and randomized and greedy algorithms.',
        avatarInitials: 'MS',
      },
      isLive: false,
      canvasSync: 'Midterm 2 Study Guide Available',
      streamUrl: 'https://uci.zoom.us/j/9482019482',
      outline: {
        unit: 'Midterm 2 Practice Problems',
        summary: 'Reviewing Master Theorem cases, Matrix Chain Multiplication, and DAG shortest paths.',
        keyConcepts: ['Identifying optimal substructure', 'Avoiding common dynamic programming off-by-one errors'],
        reading: 'Review Lecture Slides 10–14',
        assignments: 'Practice Exam 2 (Ungraded self-check)',
        rubricConstraint: 'Write formal recurrences before pseudo-code.',
        officeHours: 'Live Q&A stream on Zoom',
      },
      syllabusNotes: {
        overview: 'Comprehensive review session dissecting past midterm questions with live student walk-throughs.',
        prerequisites: 'Lectures 1 through 14.',
        coreTopics: ['Divide and Conquer', 'Greedy Exchange Arguments', 'Dynamic Programming Formulations'],
        codeSnippets: [],
      },
      downloads: [
        {
          id: 'dl-midterm',
          name: 'Practice Midterm 2 with Solutions (PDF)',
          size: '1.8 MB',
          type: 'pdf',
          description: 'Official practice exam provided by instructional team.',
          downloadName: 'CS161_Practice_Midterm2.pdf',
        },
      ],
      discussionThreads: [],
    },
    {
      id: 'cs178-nov22',
      code: 'COMPSCI 178',
      subject: 'compsci',
      title: 'Machine Learning & Data Mining Lab',
      time: '2:00 PM – 3:30 PM',
      location: 'DBH 4011',
      topic: 'Gradient Descent: Convex Optimization & Learning Rates',
      instructor: {
        name: 'Prof. Stephan Mandt',
        title: 'Associate Professor of Computer Science',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'mandt@uci.edu',
        office: 'DBH 4208',
        officeHours: 'Mon 3:00 PM',
        bio: 'Researching probabilistic machine learning, deep generative models, and variational inference.',
        avatarInitials: 'SM',
      },
      isLive: false,
      canvasSync: 'Homework 3 Jupyter Notebook Due Nov 24',
      streamUrl: 'https://uci.zoom.us/j/9812903487',
      outline: {
        unit: 'Optimization for Supervised Learning',
        summary: 'Batch gradient descent, stochastic gradient descent (SGD), and learning rate scheduling.',
        keyConcepts: ['Loss function convexity', 'Gradient computation', 'Momentum and Adam optimizer'],
        reading: 'Goodfellow et al. · Deep Learning Ch 4',
        assignments: 'Jupyter Lab 3 (Canvas)',
        rubricConstraint: 'Vectorized NumPy implementations only (no raw Python loops).',
        officeHours: 'Prof. Mandt · Sat 3:30 PM',
      },
      syllabusNotes: {
        overview: 'Iterative optimization routines minimizing empirical risk on training distributions.',
        prerequisites: 'Multivariate calculus (gradients), linear algebra, NumPy.',
        coreTopics: ['Loss gradients', 'Learning rate tuning', 'Local minima vs saddle points'],
        codeSnippets: [],
      },
      downloads: [],
      discussionThreads: [],
    },
  ],

  // ==========================================
  // SUNDAY NOV 23, 2026 (currentDate + 2)
  // ==========================================
  '2026-11-23': [
    {
      id: 'cs161-nov23',
      code: 'COMPSCI 161',
      subject: 'compsci',
      title: 'Algorithms Collaborative Problem Jam',
      time: '1:00 PM – 3:00 PM',
      location: 'Donald Bren Hall 1200',
      topic: 'Problem Set 4 Open Workgroup: Matrix Chain Multiplication',
      instructor: {
        name: 'TA Alex Rivera',
        title: 'Lead Graduate Teaching Assistant',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'arivera@uci.edu',
        office: 'ICS 248',
        officeHours: 'Sun 1:00 PM – 3:00 PM',
        bio: 'PhD candidate in algorithms complexity theory.',
        avatarInitials: 'AR',
      },
      isLive: false,
      canvasSync: 'Problem Set 4 Due Monday 11:59 PM',
      streamUrl: 'https://uci.zoom.us/j/9482019482',
      outline: {
        unit: 'Matrix Chain Multiplication & Parenthesization',
        summary: 'Optimal parenthesization of matrix chains using O(n³) dynamic programming.',
        keyConcepts: ['Matrix dimension compatibility', 'Splitting index k optimization', 'Reconstructing parentheses'],
        reading: 'CLRS Algorithms · Ch 15.2',
        assignments: 'Problem Set 4 (Due Monday)',
        rubricConstraint: 'Include the full split-point table s[i, j].',
        officeHours: 'TA Alex Rivera · Sun 1:00 PM',
      },
      syllabusNotes: {
        overview: 'Finding the most cost-effective order of computing product A1 * A2 * ... * An.',
        prerequisites: 'Matrix multiplication arithmetic, dynamic programming table memoization.',
        coreTopics: ['Parenthesization trees', 'Catalan number growth', 'Dynamic programming O(n³) algorithm'],
        codeSnippets: [],
      },
      downloads: [
        {
          id: 'dl-matrix',
          name: 'Matrix Chain Multiplication Primer (PDF)',
          size: '1.2 MB',
          type: 'pdf',
          description: 'Step-by-step example with 4 matrices.',
          downloadName: 'Matrix_Chain_Multiplication.pdf',
        },
      ],
      discussionThreads: [],
    },
    {
      id: 'cs121-nov23',
      code: 'COMPSCI 121',
      subject: 'compsci',
      title: 'Information Retrieval & Web Search',
      time: '3:30 PM – 5:00 PM',
      location: 'Online Webinar',
      topic: 'Inverted Index Construction & TF-IDF Vector Spaces',
      instructor: {
        name: 'Prof. Ramesh Jain',
        title: 'Donald Bren Professor of Computer Science',
        department: 'Donald Bren School of Information & Computer Sciences, UC Irvine',
        email: 'jain@uci.edu',
        office: 'DBH 3072',
        officeHours: 'Sun 5:00 PM',
        bio: 'Pioneer in multimedia computing, cyber-physical systems, and health informatics.',
        avatarInitials: 'RJ',
      },
      isLive: false,
      canvasSync: 'Project 3 Search Engine Engine Due Nov 26',
      streamUrl: 'https://uci.zoom.us/j/9102938471',
      outline: {
        unit: 'Inverted Indices & Document Scoring',
        summary: 'Building posting lists and computing cosine similarity with TF-IDF weights.',
        keyConcepts: ['Term frequency (TF)', 'Inverse document frequency (IDF)', 'Positional posting lists'],
        reading: 'Manning, Raghavan & Schutze · Intro to IR Ch 1–2',
        assignments: 'Project 3 Search Engine',
        rubricConstraint: 'Index construction must run in under 60 seconds on the test corpus.',
        officeHours: 'Prof. Jain · Sun 5:00 PM',
      },
      syllabusNotes: {
        overview: 'The fundamental data structure powering modern web search engines.',
        prerequisites: 'Hash maps, file I/O, string tokenization.',
        coreTopics: ['Tokenization', 'Stop word filtering', 'Inverted index compression'],
        codeSnippets: [],
      },
      downloads: [],
      discussionThreads: [],
    },
  ],
}

// Helper functions
export function getClassesForDate(dateKey: string, subjectFilter: SubjectCategory = 'all'): ScheduledClass[] {
  const classes = SCHEDULE_DATA[dateKey] || []
  if (subjectFilter === 'all') return classes
  return classes.filter((c) => c.subject === subjectFilter)
}

export function getCompsciClassesForDate(dateKey: string): ScheduledClass[] {
  return (SCHEDULE_DATA[dateKey] || []).filter((c) => c.subject === 'compsci')
}

export function getClassById(classId: string, dateKey?: string): ScheduledClass | undefined {
  if (dateKey && SCHEDULE_DATA[dateKey]) {
    const found = SCHEDULE_DATA[dateKey].find((c) => c.id === classId)
    if (found) return found
  }
  // Global search across all dates
  for (const date in SCHEDULE_DATA) {
    const found = SCHEDULE_DATA[date].find((c) => c.id === classId)
    if (found) return found
  }
  return undefined
}

export function getDateStripItem(dateKey: string): DateStripItem | undefined {
  return DATE_STRIP_ITEMS.find((d) => d.dateKey === dateKey)
}
