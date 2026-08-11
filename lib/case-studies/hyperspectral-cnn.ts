import type { CaseStudy } from '@/lib/data'

export const hyperspectralCnnCaseStudy: CaseStudy = {
  tagline:
    'A hybrid 3D-2D CNN with a learned spatial attention mechanism that classifies hyperspectral images more accurately than prior state-of-the-art methods, using roughly 43% fewer parameters.',
  stats: [
    { label: 'Overall accuracy (avg., 3 datasets)', value: '~99.8%' },
    { label: 'Benchmark datasets evaluated', value: '3' },
    { label: 'Parameters vs. 3D-CNN baseline', value: '~43% fewer' },
  ],
  sections: [
    {
      heading: 'Overview',
      body: [
        'Hyperspectral imaging captures light across hundreds of narrow spectral bands instead of the three (red, green, blue) a normal camera sees — enough to identify the physical composition of what\'s in frame, not just its color. That makes it valuable for agriculture, environmental monitoring, and remote sensing, but it also makes classification genuinely hard: each pixel is a vector across hundreds of correlated bands, datasets are large, and labeled training data is scarce.',
        'This paper proposes a hybrid 3D-2D convolutional neural network with a learned spatial attention mechanism for hyperspectral image (HSI) classification, published at ICCIT 2024 (the 27th International Conference on Computer and Information Technology, Cox\'s Bazar, Bangladesh). Co-authored with Esmay Bhuiyan, Sadia Zaman Mishu, and Md. Ali Hossain at Rajshahi University of Engineering & Technology.',
      ],
    },
    {
      heading: 'The Problem',
      body: [
        '2D CNNs are computationally cheap and effective at extracting spatial features, but treat each spectral band largely independently — they don\'t exploit the fact that HSI classification depends on both spectral and spatial information jointly. 3D CNNs solve that by convolving across spectral and spatial dimensions together, which improves accuracy but sharply increases the parameter count and computational cost, since every added spectral dimension multiplies the size of every 3D kernel.',
        'The goal was a model that gets 3D-CNN-level accuracy without paying its full computational cost.',
      ],
    },
    {
      heading: 'Method',
      body: [
        'Each spectral band is first Z-score normalized (mean 0, standard deviation 1) so bands with very different value ranges become directly comparable. Incremental PCA (iPCA) then reduces the hundreds of original spectral bands down to the 20 most informative ones — "incremental" matters here because it processes data in batches rather than needing the whole dataset in memory at once, which is what makes it practical on large hyperspectral cubes.',
        'From there, small overlapping 3D patches are cropped from the reduced image and fed into two parallel branches. The first is a hybrid 3D-2D convolutional branch: two 3D convolutional layers extract joint spectral-spatial features, which are then reshaped and passed through two 2D convolutional layers for further spatial refinement. The second is a learned spatial attention branch — rather than a fixed pooling operation, a small convolutional block downsamples, refines, and normalizes the patch to produce attention weights that emphasize the spatially important regions of each patch.',
        'The two branches\' outputs are concatenated and passed through a fully connected layer with a softmax classifier. The Mish activation function is used throughout the network in place of ReLU, which the paper found improved convergence.',
      ],
    },
    {
      heading: 'Results',
      body: [
        'The model was evaluated on three public benchmark hyperspectral datasets — Indian Pines, Pavia University, and Salinas — against six prior methods (2D-CNN, 3D-CNN, MS-3D-CNN, FC-3D-CNN, GMA-net, and GATN-RTC). At the best-performing patch size (11×11), it reached ~99.8% overall accuracy averaged across all three datasets, outperforming every baseline on every dataset, including the strongest prior results (FC-3D-CNN, GMA-net).',
        'The efficiency side of the result is the more interesting one: the proposed architecture uses about 566,000 trainable parameters versus roughly 995,000 for a plain iPCA+3D-CNN baseline on the same datasets — a ~43% reduction — while still coming out ahead on accuracy. Patch size beyond 11×11 was tested up to 17×17 with only marginal accuracy gains, so 11×11 was kept as the practical sweet spot.',
      ],
      bullets: [
        'Indian Pines: 99.78% overall accuracy, 98.99% Kappa',
        'Pavia University: 99.81% overall accuracy, 99.11% Kappa',
        'Salinas: 99.77% overall accuracy, 99.77% Kappa',
      ],
    },
    {
      heading: "What's Next",
      body: [
        'The paper flags two directions for follow-up work: applying transfer learning so the model generalizes across different hyperspectral datasets without full retraining, and extending the attention mechanism with more advanced architectures such as transformers to capture longer-range spatial dependencies.',
      ],
    },
  ],
}
