import { HomeFeature } from '@/components/organisms/HomeFeature';
import { InterestPanel } from '@/components/organisms/InterestPanel';
import { LatestList } from '@/components/organisms/LatestList';
import { OpinionBlock } from '@/components/organisms/OpinionBlock';
import { SectionBlock } from '@/components/organisms/SectionBlock';
import {
  articleLayout,
  getArticle,
  getOpinion,
  getTeaser,
  home,
  ui,
  type FillerBlock,
  type OpinionBlock as OpinionBlockContent,
} from '@/data';

const isFillerBlock = (block: FillerBlock | OpinionBlockContent): block is FillerBlock =>
  'filler' in block;

export function HomeTemplate() {
  const feature = getArticle(home.feature);
  const latest = [...home.latest.real, ...home.latest.filler].map(getTeaser);
  const fillerBlocks = home.blocks.filter(isFillerBlock);
  const opinionBlocks = home.blocks.filter(
    (block): block is OpinionBlockContent => !isFillerBlock(block),
  );
  const isInterest = (block: FillerBlock) => block.title === articleLayout.moreStories.title;

  return (
    <div className="mx-auto flex max-w-portada flex-col gap-10 px-4 py-6 lg:py-8">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {feature && <HomeFeature article={feature} />}
        <LatestList title={ui.latestTitle} teasers={latest} />
      </div>

      <div className="grid gap-10 border-t border-linea pt-8 lg:grid-cols-[2fr_1fr] lg:gap-8">
        <div className="flex flex-col gap-10">
          {fillerBlocks
            .filter((block) => !isInterest(block))
            .map((block) => (
              <SectionBlock
                key={block.title}
                title={block.title}
                teasers={block.filler.map(getTeaser)}
              />
            ))}
        </div>
        <div className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
          {fillerBlocks.filter(isInterest).map((block) => (
            <InterestPanel
              key={block.title}
              title={block.title}
              teasers={block.filler.map(getTeaser)}
            />
          ))}
          {opinionBlocks.map((block) => (
            <OpinionBlock
              key={block.title}
              title={block.title}
              items={block.opinion.map(getOpinion)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
