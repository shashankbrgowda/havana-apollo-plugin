export interface ControlledAttributeType {
  label: string
}
export interface ControlledAttribute {
  label: string
  children: ControlledAttributeType[]
}

export const geneControlledAttributes: ControlledAttribute[] = [
  {
    label: 'annotation in progress',
    children: [],
  },
  {
    label: 'confirm experimentally',
    children: [],
  },
  {
    label: 'EnsEMBL merge exception',
    children: [],
  },
  {
    label: 'fragmented locus',
    children: [],
  },
  {
    label: 'fragmented mixed strand locus',
    children: [],
  },
  {
    label: 'ncRNA host',
    children: [],
  },
  {
    label: 'precursor_RNA',
    children: [],
  },
  {
    label: 'not for VEGA',
    children: [],
  },
  {
    label: 'not for VEGA',
    children: [],
  },
  {
    label: 'orphan',
    children: [],
  },
  {
    label: 'overlapping locus',
    children: [],
  },
  {
    label: 'overlaps pseudogene',
    children: [],
  },
  {
    label: 'polymorphic pseudogene no stop',
    children: [],
  },
  {
    label: 'reference genome error',
    children: [],
  },
  {
    label: 'retrogene',
    children: [],
  },
  {
    label: 'Selenoprotein',
    children: [],
  },
  {
    label: 'semi-processed',
    children: [],
  },
  {
    label: 'Set Locus Biotype',
    children: [
      {
        label: "ASB_3'_overlapping_ncRNA",
      },
      {
        label: 'ASB_antisense',
      },
      {
        label: 'ASB_lincRNA',
      },
      {
        label: 'ASB_protein_coding',
      },
      {
        label: 'ASB_sense_intronic',
      },
      {
        label: 'ASB_sense_overlapping',
      },
    ],
  },
]

export const transcriptControlledAttributes: ControlledAttribute[] = [
  {
    label: "alternative 3' UTR",
    children: [],
  },
  {
    label: "alternative 5' UTR",
    children: [],
  },
  {
    label: 'bicistronic',
    children: [],
  },
  {
    label: 'CAGE supported TSS',
    children: [],
  },
  {
    label: 'CARS',
    children: [],
  },
  {
    label: 'confirm experimentally',
    children: [],
  },
  {
    label: 'dotter confirmed',
    children: [],
  },
  {
    label: 'Genoscope mRNA only',
    children: [],
  },
  {
    label: 'inferred exon combination',
    children: [],
  },
  {
    label: 'inferred transcript model',
    children: [],
  },
  {
    label: 'low sequence quality',
    children: [],
  },
  {
    label: 'NMD exception',
    children: [],
  },
  {
    label: 'NMD likely if extended',
    children: [],
  },
  {
    label: 'non-submitted evidence',
    children: [],
  },
  {
    label: 'not best-in-genome evidence',
    children: [],
  },
  {
    label: 'not for VEGA',
    children: [],
  },
  {
    label: 'not organism-supported',
    children: [],
  },
  {
    label: 'overlaps pseudogene',
    children: [],
  },
  {
    label: 'poly-adenylated',
    children: [],
  },
  {
    label: 'pseudogene transcript',
    children: [],
  },
  {
    label: 'QC splicing correct',
    children: [],
  },
  {
    label: 'prediction only',
    children: [],
  },
  {
    label: 'readthrough',
    children: [],
  },
  {
    label: 'readthrough',
    children: [],
  },
  {
    label: 'Assembly issue',
    children: [
      {
        label: 'genome patch truncated',
      },
      {
        label: 'UTR of coding transcript',
      },
      {
        label: 'sequence error',
      },
    ],
  },
  {
    label: 'Translation',
    children: [
      {
        label: 'upstream ATG',
      },
      {
        label: 'downstream ATG',
      },
      {
        label: 'non-ATG start',
      },
      {
        label: 'RP supported TIS',
      },
    ],
  },
  {
    label: 'Upstream ORF',
    children: [
      {
        label: 'upstream uORF',
      },
      {
        label: 'overlapping uORF',
      },
    ],
  },
  {
    label: 'Splice',
    children: [
      {
        label: 'NAGNAG splice site',
      },
      {
        label: 'non canonical conserved',
      },
      {
        label: 'non canonical genome sequence error',
      },
      {
        label: 'non canonical other',
      },
      {
        label: 'non canonical polymorphism',
      },
      {
        label: 'non canonical U12',
      },
      {
        label: 'non canonical TEC',
      },
    ],
  },
  {
    label: 'Retained Intron',
    children: [
      {
        label: 'retained intron first',
      },
      {
        label: 'retained intron CDS',
      },
      {
        label: 'retained intron final',
      },
    ],
  },
  {
    label: 'RNA-Seq support',
    children: [
      {
        label: 'RNA-Seq supported only',
      },
      {
        label: 'RNA-Seq supported partial',
      },
      {
        label: '454 RNA-Seq supported',
      },
      {
        label: 'nested 454 RNA-Seq supported',
      },
      {
        label: "3' standard supported extension",
      },
      {
        label: "3' nested supported extension",
      },
      {
        label: "5' standard supported extension",
      },
      {
        label: "5' nested supported extension",
      },
    ],
  },
  {
    label: 'LR',
    children: [
      {
        label: 'LR annotation',
      },
      {
        label: "LR 3' extension",
      },
    ],
  },
  {
    label: 'MANE',
    children: [
      {
        label: 'MANE_select',
      },
      {
        label: 'MANE_plus',
      },
      {
        label: 'MANE_plus_clinical',
      },
    ],
  },
  {
    label: 'GCP',
    children: [
      {
        label: 'add to GCP',
      },
      {
        label: 'remove from GCP',
      },
    ],
  },
]
