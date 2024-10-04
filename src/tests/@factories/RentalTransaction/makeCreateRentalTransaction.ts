import { InMemorySkinRepository } from "@/repositories/in-memory/inMemorySkinRepository";

export class MakeCreateSkinRepository {
  constructor(private skinRepository: InMemorySkinRepository) {}
}
