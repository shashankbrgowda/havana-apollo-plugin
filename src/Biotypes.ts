export interface BiotypeSubtype {
  label: string
  so_term?: string
  display_name: string
  active?: boolean
}
export interface Biotype {
  label: string
  so_term?: string
  display_name: string
  subtypes: BiotypeSubtype[]
  active?: boolean
}

export const biotypes: Biotype[] = [
  {
    label: 'retained_intron',
    so_term: 'transcript',
    display_name: 'Retained Intron',
    subtypes: [],
    active: true,
  },
  {
    label: 'transcript',
    so_term: 'transcript',
    display_name: 'Transcript',
    subtypes: [],
    active: true,
  },
  {
    label: 'coding_type',
    display_name: 'Coding Type',
    active: true,
    subtypes: [
      {
        label: 'coding',
        so_term: 'mRNA',
        display_name: 'Coding',
        active: true,
      },
      {
        label: 'known_CDS',
        so_term: 'mRNA',
        display_name: 'Known_CDS',
        active: true,
      },
      {
        label: 'novel_CDS',
        so_term: 'mRNA',
        display_name: 'Novel_CDS',
        active: true,
      },
      {
        label: 'putative_CDS',
        so_term: 'mRNA',
        display_name: 'Putative_CDS',
        active: true,
      },
      {
        label: 'nonsense_mediated_decay',
        so_term: 'mRNA',
        display_name: 'Nonsense_mediated_decay',
        active: true,
      },
      {
        label: 'non_stop_decay',
        so_term: 'mRNA',
        display_name: 'Non_stop_decay',
        active: true,
      },
    ],
  },
  {
    label: 'ensembl_only',
    display_name: 'Ensembl only',
    subtypes: [
      {
        label: 'predicted',
        so_term: 'Predicted',
        display_name: 'Predicted',
      },
      {
        label: 'ensembl_predicted',
        so_term: 'Ensembl',
        display_name: 'ensembl:Predicted',
      },
      {
        label: 'IG_J_gene',
        so_term: 'IG_J_gene',
        display_name: 'IG_J_gene',
      },
      {
        label: 'IG_C_gene',
        so_term: 'IG_C_gene',
        display_name: 'IG_C_gene',
      },
      {
        label: 'IG_D_gene',
        so_term: 'IG_D_gene',
        display_name: 'IG_D_gene',
      },
      {
        label: 'IG_V_gene',
        so_term: 'IG_V_gene',
        display_name: 'IG_V_gene',
      },
      {
        label: 'Ig_lv_gene',
        so_term: 'Ig_lv_gene',
        display_name: 'Ig_lv_gene',
      },
      {
        label: 'ensembl_pseudogene',
        so_term: 'Ensembl',
        display_name: 'ensembl:Pseudogene',
      },
      {
        label: 'IG_C_pseudogene',
        so_term: 'IG_C_pseudogene',
        display_name: 'IG_C_pseudogene',
      },
      {
        label: 'IG_J_pseudogene',
        so_term: 'IG_J_pseudogene',
        display_name: 'IG_J_pseudogene',
      },
      {
        label: 'IG_V_pseudogene',
        so_term: 'IG_V_pseudogene',
        display_name: 'IG_V_pseudogene',
      },
      {
        label: 'lncRNA',
        so_term: 'lncRNA',
        display_name: 'lncRNA',
      },
      {
        label: 'rRNA_pseudogene',
        so_term: 'rRNA_pseudogene',
        display_name: 'rRNA_pseudogene',
      },
      {
        label: 'misc_RNA',
        so_term: 'misc_RNA',
        display_name: 'misc_RNA',
      },
      {
        label: 'ribozyme',
        so_term: 'ribozyme',
        display_name: 'ribozyme',
      },
      {
        label: 'sRNA',
        so_term: 'sRNA',
        display_name: 'sRNA',
      },
      {
        label: 'scaRNA',
        so_term: 'scaRNA',
        display_name: 'scaRNA',
      },
      {
        label: 'TR_J_pseudogene',
        so_term: 'TR_J_pseudogene',
        display_name: 'TR_J_pseudogene',
      },
      {
        label: 'TR_V_pseudogene',
        so_term: 'TR_V_pseudogene',
        display_name: 'TR_V_pseudogene',
      },
      {
        label: 'ensembl_ncRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl_ncRNA',
      },
      {
        label: 'ensembl_lincRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:lincRNA',
      },
      {
        label: 'ensembl_lncRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:lncRNA',
      },
      {
        label: 'ensembl_miRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:miRNA',
      },
      {
        label: 'mirbase_miRNA',
        so_term: 'mirbase:miRNA',
        display_name: 'mirbase:miRNA',
      },
      {
        label: 'ensembl_misc_RNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:misc_RNA',
      },
      {
        label: 'ensembl_ribozyme',
        so_term: 'Ensembl',
        display_name: 'ensembl:ribozyme',
      },
      {
        label: 'ensembl_rRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:rRNA',
      },
      {
        label: 'ensembl_rRNA_pseudogene',
        so_term: 'Ensembl',
        display_name: 'ensembl:rRNA_pseudogene',
      },
      {
        label: 'ensembl_scaRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:scaRNA',
      },
      {
        label: 'ensembl_snoRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:snoRNA',
      },
      {
        label: 'ensembl_snRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:snRNA',
      },
      {
        label: 'ensembl_sRNA',
        so_term: 'Ensembl',
        display_name: 'ensembl:sRNA',
      },
    ],
  },
  {
    label: 'known_ncRNA',
    display_name: 'Known_ncRNA',
    subtypes: [
      {
        label: 'miRNA',
        so_term: 'miRNA',
        display_name: 'miRNA',
      },
      {
        label: 'rRNA',
        so_term: 'rRNA',
        display_name: 'rRNA',
      },
      {
        label: 'snoRNA',
        so_term: 'snoRNA',
        display_name: 'snoRNA',
      },
      {
        label: 'snRNA',
        so_term: 'snRNA',
        display_name: 'snRNA',
      },
      {
        label: 'vault_rna',
        so_term: 'Vault_rna',
        display_name: 'Vault_rna',
      },
      {
        label: 'Y_RNA',
        so_term: 'Y_RNA',
        display_name: 'Y_RNA',
      },
      {
        label: 'piRNA',
        so_term: 'piRNA',
        display_name: 'piRNA',
      },
      {
        label: 'scRNA',
        so_term: 'scRNA',
        display_name: 'scRNA',
      },
      {
        label: 'siRNA',
        so_term: 'siRNA',
        display_name: 'siRNA',
      },
      {
        label: 'tRNA',
        so_term: 'tRNA',
        display_name: 'tRNA',
      },
    ],
  },
  {
    label: 'non_coding',
    display_name: 'Non_coding',
    active: true,
    subtypes: [
      {
        label: 'lincRNA',
        so_term: 'transcript',
        display_name: 'lincRNA',
        active: true,
      },
      {
        label: 'macro_lncRNA',
        so_term: 'transcript',
        display_name: 'Macro_lncRNA',
        active: true,
      },
      {
        label: 'antisense',
        so_term: 'transcript',
        display_name: 'Antisense',
        active: true,
      },
      {
        label: 'sense_intronic',
        so_term: 'transcript',
        display_name: 'Sense_intronic',
        active: true,
      },
      {
        label: 'sense_overlapping',
        so_term: 'transcript',
        display_name: 'Sense_overlapping',
        active: true,
      },
      {
        label: "3'_overlapping_ncRNA",
        so_term: 'transcript',
        display_name: "3'_overlapping_ncRNA",
        active: true,
      },
      {
        label: 'bidirectional_promoter_lncRNA',
        so_term: 'transcript',
        display_name: 'Bidirectional_promoter_lncRNA',
        active: true,
      },
    ],
  },
  {
    label: 'other',
    display_name: 'Other',
    subtypes: [
      {
        label: 'disrupted_domain',
        so_term: 'Disrupted_domain',
        display_name: 'Disrupted_domain',
      },
      {
        label: 'IG_gene',
        so_term: 'IG_gene',
        display_name: 'IG_gene',
      },
      {
        label: 'TR_gene',
        so_term: 'TR_gene',
        display_name: 'TR_gene',
      },
      {
        label: 'putative',
        so_term: 'Putative',
        display_name: 'Putative',
      },
      {
        label: 'transposon',
        so_term: 'Transposon',
        display_name: 'Transposon',
      },
      {
        label: 'artifact',
        so_term: 'Artifact',
        display_name: 'Artifact',
      },
      {
        label: 'TEC',
        so_term: 'TEC',
        display_name: 'TEC',
      },
      {
        label: 'comp_pipe',
        so_term: 'Comp_pipe',
        display_name: 'Comp_pipe',
      },
    ],
  },
  {
    label: 'pseudogene',
    display_name: 'Pseudogene',
    subtypes: [
      {
        label: 'processed_pseudogene',
        so_term: 'Processed_pseudogene',
        display_name: 'Processed_pseudogene',
      },
      {
        label: 'unprocessed_pseudogene',
        so_term: 'Unprocessed_pseudogene',
        display_name: 'Unprocessed_pseudogene',
      },
      {
        label: 'transcribed_processed_pseudogene',
        so_term: 'Transcribed_processed_pseudogene',
        display_name: 'Transcribed_processed_pseudogene',
      },
      {
        label: 'transcribed_unprocessed_pseudogene',
        so_term: 'Transcribed_unprocessed_pseudogene',
        display_name: 'Transcribed_unprocessed_pseudogene',
      },
      {
        label: 'translated_processed_pseudogene',
        so_term: 'Translated_processed_pseudogene',
        display_name: 'Translated_processed_pseudogene',
      },
      {
        label: 'translated_unprocessed_pseudogene',
        so_term: 'Translated_unprocessed_pseudogene',
        display_name: 'Translated_unprocessed_pseudogene',
      },
      {
        label: 'unitary_pseudogene',
        so_term: 'Unitary_pseudogene',
        display_name: 'Unitary_pseudogene',
      },
      {
        label: 'transcribed_unitary_pseudogene',
        so_term: 'Transcribed_unitary_pseudogene',
        display_name: 'Transcribed_unitary_pseudogene',
      },
      {
        label: 'polymorphic_pseudogene',
        so_term: 'Polymorphic_pseudogene',
        display_name: 'Polymorphic_pseudogene',
      },
      {
        label: 'IG_pseudogene',
        so_term: 'IG_pseudogene',
        display_name: 'IG_pseudogene',
      },
      {
        label: 'TR_pseudogene',
        so_term: 'TR_pseudogene',
        display_name: 'TR_pseudogene',
      },
      {
        label: 'pseudoexon',
        so_term: 'Pseudoexon',
        display_name: 'Pseudoexon',
      },
    ],
  },
]
