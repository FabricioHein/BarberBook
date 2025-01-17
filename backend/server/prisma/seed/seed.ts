import { PrismaService } from '../../src/base/relacional/PrismaService';

const prisma = new PrismaService();
var listaNome = ``
const Config = {
  empresa_config: [
    {
      nome_empresa: 'agendaPipe',
      logo_link: '',
      nome_fantasia: 'agendaPipe',
      currentPlanId: 1
    },
  ],
  tipo_projeto: [
    {
      id: 1,
      descricao: 'Gestão Projetos',
    },
    {
      id: 2,
      descricao: 'CRM',
    },
  ],
  usuarios: {
    nome: 'fabricio',
    cpf: '07230589975',
    isAdmin: true,
    sexoId: 2,
    tipoUsuarioId: 1,
    email: 'fabricio.hein@live.com',
    password: '$2a$10$i3vF7YAgOOrsZ0QaGwNHru11Ztm7mHmUln1o88gNRSDRxmpQ3Bdpm', // senha admin1234
  },
  planos: [
    { id: 1, name: 'Plano Mensal', price: 89.90 },
    { id: 2, name: 'Plano Anual', price: 899.90 }
  ],
  tipos_usuario: [
    {
      descricao: 'Barbeiro'
    },
    {
      descricao: 'Recepcionista'
    },
    {
      descricao: 'Gerente de Barbearia'
    }

  ],
  produtos: [
    {
      nome: 'Corte de Cabelo',
      link_img: './corte.png',
      descricao: 'Corte clássico ou moderno, conforme sua preferência.'
    },
    {
      nome: 'Barba',
      link_img: './barba.png',
      descricao: 'Aparar, alinhar ou desenhar a barba com acabamento profissional.'
    },
    {
      nome: 'Corte de Cabelo + Barba',
      link_img: './corte-barba.png',
      descricao: 'Pacote completo para cabelo e barba, com produtos premium.'
    },
    {
      nome: 'Sobrancelha',
      link_img: './sombrancelha.png',
      descricao: 'Design de sobrancelha para um visual impecável.'
    },
    {
      nome: 'Hidratação Capilar',
      link_img: './hidratacao.png',
      descricao: 'Tratamento de hidratação profunda para cabelo.'
    },
    {
      nome: 'Corte Infantil',
      link_img: './infantil.png',
      descricao: 'Corte de cabelo especial para crianças.'
    }
  ],
  modulos: [

    {
      id: 1,
      nome: 'CRM',
      url: '/crm',
      ativo: true,
      icon: 'bi bi-bullseye',
      ordem: 1,
    },

    {
      id: 3,
      nome: 'Cadastro',
      url: '/cadastro',
      ativo: true,
      icon: 'bi bi-database-fill-add',
      ordem: 3,
    },

    {
      id: 5,
      nome: 'Configuração',
      url: '/config',
      ativo: true,
      icon: 'bi bi-gear',
      ordem: 5,
    }

  ],
  submodulos: [

    {
      moduloId: 1,
      ativo: true,
      icon: 'bi bi-calendar-check',
      nome: 'Minha Agenda',
      url: '/minha-agenda',
      ordem: 1
    },
    {
      moduloId: 1,
      ativo: true,
      icon: 'bi bi-clipboard2-data',
      nome: 'Relatórios Clientes',
      url: '/relatorios-leads',
      ordem: 4
    },

    {
      moduloId: 3,
      ativo: true,
      icon: 'bi bi-person-vcard',
      nome: 'Clientes',
      url: '/cliente',
      ordem: 3
    },
    {
      moduloId: 3,
      ativo: true,
      icon: 'bi bi-box-seam',
      nome: 'Produtos/Serviços',
      url: '/produtos',
      ordem: 4
    },

    {
      moduloId: 3,
      ativo: true,
      icon: 'bi bi-people',
      nome: 'Minha Equipe',
      url: '/usuarios',
      ordem: 5
    },

    {
      moduloId: 5,
      ativo: true,
      icon: 'bi bi-credit-card-2-back',
      nome: 'Plano e Pagamentos',
      url: '/pagamentos',
      ordem: 2

    }

  ],
  sexo: [
    {
      id: 1,
      descricao: 'Feminino',
    },
    {
      id: 2,
      descricao: 'Masculino',
    },
  ],

  opcao: [
    {
      id: 1,
      descricao: 'Sim',
      Opcao: true,
    },
    {
      id: 2,
      descricao: 'Não',
      Opcao: false,
    },
  ],
};

async function main() {
  const enunSexo = await prisma.sexo.findMany();

  await prisma.tipoUsuario.createMany({
    data: Config.tipos_usuario
  });
  
  if (enunSexo.length == 0) {
    await prisma.plan.createMany({
      data: Config.planos,
    });



    await prisma.empresa_config.createMany({
      data: Config.empresa_config,
    });

    await prisma.modulo.createMany({
      data: Config.modulos,
    });
    await prisma.subModulo.createMany({
      data: Config.submodulos,
    });
    await prisma.opcao.createMany({
      data: Config.opcao,
    });

    await prisma.sexo.createMany({
      data: Config.sexo,
    });
  }
  const user = await prisma.users.create({
    data: {
      ...Config.usuarios,
    },
  });

  if (user) {

    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        empresa_configId: 1
      }
    });
    //permissao admin
    const modulos = await prisma.modulo.findMany();
    const subModulos = await prisma.subModulo.findMany();

    let permissaoModulos = modulos.map(m => {
      return {
        userId: user.id,
        moduloId: m.id,
        ver: true,
      };
    });

    let permissaoSubModulos = subModulos.map(s => {
      return {
        userId: user.id,
        subModuloId: s.id,
        editar: true,
        ver: true,
        deletar: true,
      };
    });

    let produtos = Config.produtos.map(prod => {
      return {
        empresa_configId: 1,
        ...prod
      };
    });


    await prisma.produto.createMany({
      data: produtos
    });

    await prisma.permissao_modulos.createMany({
      data: [...permissaoModulos],
    });

    await prisma.permissao_sub_modulos.createMany({
      data: [...permissaoSubModulos],
    });
  }
}
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
