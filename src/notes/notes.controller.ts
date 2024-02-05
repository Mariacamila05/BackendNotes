import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities';
import { CreateNoteDto } from './dto';

@Controller('notes')
@Auth()
export class NotesController {

    constructor(
        private readonly notesService: NotesService,
    ) { }

    @Get()
    @Auth()
    findAll(@GetUser() user: User) {
        return this.notesService.findAll(user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.notesService.findOne(id);
    }

    @Post()
    create(@Body() createNoteDto: CreateNoteDto, @GetUser() user: User) {
        return this.notesService.create(createNoteDto, user.id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNoteDto: CreateNoteDto) {
        return this.notesService.update(id, updateNoteDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.notesService.remove(id);
    }
}
