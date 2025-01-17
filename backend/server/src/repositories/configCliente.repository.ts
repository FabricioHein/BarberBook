import { PrismaService } from 'src/base/relacional/PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigClienteRepository {
  constructor(private prisma: PrismaService) {}
  async getCliente() {
    return await this.prisma.empresa_config.findFirstOrThrow();
  }
  async getByUUIDCliente(uuid) {
    return await this.prisma.empresa_config.findFirst({
      where: {
       uuid: uuid
      },
      select:{
        nome_empresa: true,
        id: true,
        logo_link: true,
        Users:{
          where:{
            tipoUsuarioId: 1
          },
          select:{
            id: true,
            linkFoto: true,
            nome: true
          }
        },
        produto:{
          select:{
            nome: true,
            codigo: true,
            id: true,
            link_img: true
          }
        }
      }
     
    });
  }
  async getByIdCliente(id) {
    return await this.prisma.empresa_config.findFirst({
      where: {
        id: id,
      },
    });
  }
  async getByEmail(email) {
    return await this.prisma.empresa_config.findFirst({
      where: {
        email: email
      },
    });
  }
  async getByCnpjEmailCliente(cnpj_cpf, email) {
    return await this.prisma.empresa_config.findFirst({
      where: {
       AND: [
        {
          cnpj_cpf: cnpj_cpf
        },
        {
          email: email
        }
       ]
      },
    });
  }
  async getByCnpjCliente(cnpj_cpf) {
    return await this.prisma.empresa_config.findFirst({
      where: {
        cnpj_cpf: cnpj_cpf,
      },
    });
  }
  async createCliente(data) {
    return await this.prisma.empresa_config.create({
      data: data,
    });
  }

  async updateCliente(id, data) {
    return await this.prisma.empresa_config.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async deleteCliente(id) {
    return await this.prisma.empresa_config.delete({
      where: {
        id: id,
      },
    });
  }
}
