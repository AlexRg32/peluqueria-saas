<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Filament\Resources\ServiceResource\RelationManagers;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

   public static function form(Form $form): Form
{
    return $form
        ->schema([
            Forms\Components\Section::make('Información del Servicio')
                ->description('Define los detalles básicos del servicio que ofreces.')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->required()
                        ->maxLength(255)
                        ->label('Nombre del Servicio'),

                    Forms\Components\Textarea::make('description')
                        ->maxLength(65535)
                        ->columnSpanFull(),

                    Forms\Components\TextInput::make('duration_minutes')
                        ->required()
                        ->numeric()
                        ->default(30)
                        ->suffix('minutos')
                        ->label('Duración'),

                    Forms\Components\TextInput::make('price')
                        ->required()
                        ->numeric()
                        ->prefix('')
                        ->label('Precio'),

                    Forms\Components\Toggle::make('is_active')
                        ->default(true)
                        ->label('Disponible para reserva'),
                ])->columns(2)
        ]);
}

    public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('name')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('duration_minutes')
                ->numeric()
                ->suffix(' min')
                ->sortable(),
            Tables\Columns\TextColumn::make('price')
                ->money('EUR') 
                ->sortable(),
            Tables\Columns\IconColumn::make('is_active')
                ->boolean(),
        ])
        ->filters([
            // Aquí añadiremos filtros más adelante
        ]);
}

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
