import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolConfig } from '@/config/tools';

interface SeoProps {
  toolConfig: ToolConfig;
}

export const Seo: React.FC<SeoProps> = ({ toolConfig }) => {
  const defaultTitle = 'Schmidt Tools - Ferramentas para Desenvolvedores';
  const defaultDescription = 'Um hub de ferramentas gratuitas e open source para desenvolvedores, DevOps e SysAdmins.';
  const defaultKeywords = 'ferramentas, desenvolvedor, devops, sysadmin, utilitários, open source';
  const defaultImage = 'https://www.schmidtnow.com/placeholder.svg'; // Substituir por uma imagem real

  const title = toolConfig.seoTitle || defaultTitle;
  const description = toolConfig.seoDescription || defaultDescription;
  const keywords = toolConfig.keywords.join(', ') || defaultKeywords;
  const url = `https://www.schmidtnow.com${toolConfig.path}`; // Usar a URL base do projeto

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} /> {/* Usar uma imagem específica para a ferramenta se disponível */}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={defaultImage} /> {/* Usar uma imagem específica para a ferramenta se disponível */}
    </Helmet>
  );
};
