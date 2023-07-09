import t from '@babel/types';
import { maintainability, loc, totalCyclomaticComplexity } from '@modular-rocks/metrics-ts-js';

interface MetricOpts {
  code?: string;
  ast?: t.File;
  minLoc?: number;
  minMaintainability?: number;
}

interface Opts {
  loc?: Boolean;
  complexity?: Boolean;
  maintainability?: Boolean;
  metricOpts: MetricOpts;
}

interface Scores {
  loc?: number;
  complexity?: number;
  maintainability?: number;
}

export const measure = (opts: Opts) => {
  const scores: Scores = {};

  if (opts.loc) scores.loc = loc(opts.metricOpts);
  if (opts.complexity) scores.complexity = totalCyclomaticComplexity(opts.metricOpts);
  if (opts.maintainability) scores.maintainability = maintainability(opts.metricOpts);

  return scores;
};

export default (metricOpts: MetricOpts) => {
  const scores = measure({ loc: true, maintainability: true, metricOpts });
  const minLoc = metricOpts.minLoc || 50;
  const minMaintainability = metricOpts.minMaintainability || 95;
  return Boolean(
    (scores.loc && scores.loc < minLoc) || (scores.maintainability && scores.maintainability > minMaintainability)
  );
};
