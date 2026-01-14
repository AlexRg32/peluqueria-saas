<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmployeeResource\Pages;
use App\Filament\Resources\EmployeeResource\RelationManagers;
use App\Models\Employee;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EmployeeResource extends Resource
{
    protected static ?string $model = Employee::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

     public static function form(Form $form): Form
    {
        return $form->schema([ 
            Forms\Components\Section::make('Información del Empleado')
                ->description('Define los detalles básicos del empleado.')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->required()
                        ->maxLength(255)
                        ->label('Nombre'),
                    Forms\Components\TextInput::make('email')
                        ->required()
                        ->email()
                        ->maxLength(255)
                        ->label('Correo Electrónico'),
                    Forms\Components\TextInput::make('phone')
                        ->tel()
                        ->maxLength(255)
                        ->label('Teléfono'),
                    Forms\Components\FileUpload::make('avatar')
                        ->image()
                        ->directory('employees')
                        ->label('Foto'),
                ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('avatar')
                    ->label('')
                    ->circular()
                    ->size(100) // Hacemos el avatar más grande
                    ->grow(false), // Evita que ocupe más espacio del necesario
                
                Tables\Columns\TextColumn::make('name')
                    ->label('Nombre Completo')
                    ->searchable()
                    ->sortable()
                    ->weight('bold') // Texto en negrita para destacar el nombre
                    ->description(fn (Employee $record):     string => $record->email), // Pone el email debajo del nombre

                Tables\Columns\TextColumn::make('phone')
                    ->label('Teléfono')
                    ->icon('heroicon-m-phone')
                    ->searchable()
                    ->toggleable(), // Permite ocultar la columna si se quiere
            ])
            ->filters([
                
            ])
            ->actions([
                Tables\Actions\EditAction::make('Editar'),
                Tables\Actions\DeleteAction::make('Eliminar')
                    ->action(function (Employee $record) {
                        $record->delete();
                    }),
            ])
            ->bulkActions([
               
            ]);
    }

    public static function getRelations(): array
    {
        return [
            
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEmployees::route('/'),
            'create' => Pages\CreateEmployee::route('/create'),
            'edit' => Pages\EditEmployee::route('/{record}/edit'),
        ];
    }
}
