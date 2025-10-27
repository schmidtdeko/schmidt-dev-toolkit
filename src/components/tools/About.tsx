import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GitHubLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons"

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Seção Introdução */}
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-4">Sobre o Schmidt Tools</h1>
        <p className="text-muted-foreground mb-4">
          O Schmidt Tools é um conjunto de ferramentas online gratuitas desenvolvidas para facilitar o dia a dia de 
          desenvolvedores e profissionais de tecnologia. Nosso objetivo é fornecer soluções rápidas, eficientes 
          e que funcionem diretamente no seu navegador, sem necessidade de instalação ou cadastro.
        </p>
        <p className="text-muted-foreground">
          Todas as ferramentas são desenvolvidas com foco na privacidade dos usuários, processando dados 
          localmente no seu dispositivo e sem coletar informações pessoais.
        </p>
      </Card>

      {/* Seção Minha Jornada */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Minha Jornada no Desenvolvimento</h2>
        <p className="text-muted-foreground mb-4">
          Olá! Sou André Schmidt, um desenvolvedor apaixonado por criar soluções que realmente fazem a diferença. 
          Com anos de experiência em diversas tecnologias, sempre busquei aprimorar minhas habilidades e 
          compartilhar conhecimento. O Schmidt Tools nasceu dessa paixão: um espaço para oferecer ferramentas 
          práticas para a comunidade de tecnologia.
        </p>
        <p className="text-muted-foreground">
          Minha trajetória me levou a trabalhar com projetos desafiadores, focando em performance, escalabilidade 
          e uma excelente experiência do usuário. Acredito que a tecnologia deve ser acessível e colaborativa, 
          e é isso que busco refletir em cada ideia que desenvolvo.
        </p>
      </Card>

      {/* Seção Habilidades e Tecnologias */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Habilidades e Tecnologias</h2>
        <div className="flex flex-wrap gap-2">
          {['SQL', 'EDI', 'N8N', 'API', 'Inteligência Artificial', 'Desenvolvimento Web', 'Sistemas de Logística', 'Git', 'Design', 'Microserviços'].map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Seção Filosofia de Desenvolvimento */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Filosofia de Desenvolvimento</h2>
        <div className="space-y-4">
          {[
            'Código Limpo e Manutenível: Priorizo a clareza e a organização para facilitar a colaboração e futuras expansões.',
            'Performance e Otimização: Busco sempre a máxima eficiência, garantindo que as ferramentas sejam rápidas e responsivas.',
            'Segurança e Privacidade: Desenvolvo com foco na proteção de dados, utilizando processamento local sempre que possível.',
            'Experiência do Usuário (UX): Crio interfaces intuitivas e agradáveis, pensando na jornada do usuário.',
            'Inovação Contínua: Estou sempre explorando novas tecnologias e abordagens para entregar soluções de ponta.'
          ].map((philosophy) => (
            <div key={philosophy} className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">{philosophy}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Seção Contato */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Contato e Desenvolvedor</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <EnvelopeClosedIcon className="h-5 w-5" />
            <a href="mailto:andrericardoschmidt@icloud.com" className="hover:text-primary">
              andrericardoschmidt@icloud.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <GitHubLogoIcon className="h-5 w-5" />
            <a 
              href="https://github.com/schmidtdeko/schmidt-dev-toolkit" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Repositório do Projeto
            </a>
          </div>
        </div>
      </Card>

      <Separator className="my-8" />
      
      <p className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Schmidt Tools. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default About;
