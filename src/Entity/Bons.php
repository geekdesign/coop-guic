<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Entity\Pdvs;
use App\Repository\BonsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=BonsRepository::class)
 * @ApiResource(
 *   attributes={
 *      "pagination_enabled" = true,
 *      "order"={"createdAt": "DESC"}
 *   },
 *   normalizationContext={
 *      "groups" = {"bons_read"}
 *      }
 * )
 * @ApiFilter(SearchFilter::class, properties={
 *      "pdv.sap": "partial",
 *      "pdv.nom": "partial",
 *      "numBon": "partial",
 *      "entreprise.nom": "partial",
 *      "createdBy.nom": "partial",
 *      "createdBy.prenom": "partial",
 *      "technicien.nom": "partial",
 *      "technicien.prenom": "partial",
 *      "etat.nom": "partial",
 *      "sujet": "partial",
 * })
 * @ApiFilter(OrderFilter::class)
 */
class Bons
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"bons_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"bons_read", "pdvs_read", "entreprises_read", "techniciens_read", "users_read","comptes_read"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="bons")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"bons_read", "entreprises_read", "techniciens_read", "comptes_read"})
     */
    private $createdBy;

    /**
     * @ORM\ManyToOne(targetEntity=Techniciens::class, inversedBy="bons")
     * @Groups({"bons_read"})
     */
    private $technicien;

    /**
     * @ORM\ManyToOne(targetEntity=Entreprises::class, inversedBy="bons")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"bons_read", "pdvs_read", "techniciens_read", "users_read", "comptes_read"})
     * @Assert\NotBlank(message="Une entreprise est obligatoire !")
     */
    private $entreprise;

    /**
     * @ORM\ManyToOne(targetEntity=Pdvs::class, inversedBy="bons")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"bons_read", "entreprises_read", "techniciens_read", "users_read", "comptes_read"})
     * @Assert\NotBlank(message="Le PDV est obligatoire !")
     */
    private $pdv;

    /**
     * @ORM\Column(type="text")
     * @Groups({"bons_read", "pdvs_read", "entreprises_read", "techniciens_read", "users_read", "comptes_read"})
     * @Assert\NotBlank(message="Le sujet est obligatoire !")
     * @Assert\Length(
     *      min = 5,
     *      minMessage = "Le sujet doit faire au minimum 5 !",
     * )
     */
    private $sujet;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"bons_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"bons_read"})
     */
    private $remarque;

    /**
     * @ORM\ManyToOne(targetEntity=Types::class, inversedBy="bons")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"bons_read", "pdvs_read", "entreprises_read", "techniciens_read", "users_read"})
     * @Assert\NotBlank(message="Le type est obligatoire !")
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity=Categories::class, inversedBy="bons")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"bons_read", "pdvs_read", "entreprises_read", "techniciens_read", "users_read"})
     * @Assert\NotBlank(message="La catégorie est obligatoire !")
     */
    private $categorie;

    /**
     * @ORM\ManyToOne(targetEntity=Kwfs::class, inversedBy="bons")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"bons_read"})
     */
    private $kwf;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"bons_read", "pdvs_read"})
     */
    private $garantie;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"bons_read"})
     */
    private $numCredit;

    /**
     * @ORM\ManyToOne(targetEntity=Comptes::class, inversedBy="bons")
     * @Groups({"bons_read", "pdvs_read"})
     */
    private $numCompte;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"bons_read"})
     */
    private $codeSap;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"bons_read"})
     */
    private $prixHt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"bons_read"})
     */
    private $prixTtc;

    /**
     * @ORM\ManyToOne(targetEntity=Etats::class, inversedBy="bons")
     * @Groups({"bons_read", "pdvs_read", "entreprises_read", "techniciens_read", "users_read", "comptes_read"})
     * @Assert\NotBlank(message="L'état ne peut pas être vide !")
     */
    private $etat;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"bons_read", "pdvs_read", "comptes_read"})
     * @Assert\DateTime(message="La date de cloture doit être au format YYYY-MM-DD")
     */
    private $closedAt;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"bons_read"})
     */
    private $supprimer;

    /**
     * @ORM\ManyToOne(targetEntity=Departements::class, inversedBy="bons")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"bons_read"})
     * @Assert\NotBlank(message="Le département est obligatoire !")
     */
    private $departement;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"bons_read", "entreprises_read", "pdvs_read", "techniciens_read", "users_read", "comptes_read"})
     * @Assert\NotBlank(message="Le numéros de bon est obligatoire !")
     */
    private $numBon;
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): self
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    public function getTechnicien(): ?Techniciens
    {
        return $this->technicien;
    }

    public function setTechnicien(?Techniciens $technicien): self
    {
        $this->technicien = $technicien;

        return $this;
    }

    public function getEntreprise(): ?Entreprises
    {
        return $this->entreprise;
    }

    public function setEntreprise(?Entreprises $entreprise): self
    {
        $this->entreprise = $entreprise;

        return $this;
    }

    public function getPdv(): ?Pdvs
    {
        return $this->pdv;
    }

    public function setPdv(?Pdvs $pdv): self
    {
        $this->pdv = $pdv;

        return $this;
    }

    public function getSujet(): ?string
    {
        return $this->sujet;
    }

    public function setSujet(string $sujet): self
    {
        $this->sujet = $sujet;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getRemarque(): ?string
    {
        return $this->remarque;
    }

    public function setRemarque(?string $remarque): self
    {
        $this->remarque = $remarque;

        return $this;
    }

    public function getType(): ?Types
    {
        return $this->type;
    }

    public function setType(?Types $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCategorie(): ?Categories
    {
        return $this->categorie;
    }

    public function setCategorie(?Categories $categorie): self
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getKwf(): ?Kwfs
    {
        return $this->kwf;
    }

    public function setKwf(?Kwfs $kwf): self
    {
        $this->kwf = $kwf;

        return $this;
    }

    public function getGarantie(): ?bool
    {
        return $this->garantie;
    }

    public function setGarantie(?bool $garantie): self
    {
        $this->garantie = $garantie;

        return $this;
    }

    public function getNumCredit(): ?string
    {
        return $this->numCredit;
    }

    public function setNumCredit(?string $numCredit): self
    {
        $this->numCredit = $numCredit;

        return $this;
    }

    public function getNumCompte(): ?Comptes
    {
        return $this->numCompte;
    }

    public function setNumCompte(?Comptes $numCompte): self
    {
        $this->numCompte = $numCompte;

        return $this;
    }

    public function getCodeSap(): ?string
    {
        return $this->codeSap;
    }

    public function setCodeSap(?string $codeSap): self
    {
        $this->codeSap = $codeSap;

        return $this;
    }

    public function getPrixHt(): ?int
    {
        return $this->prixHt;
    }

    public function setPrixHt(?int $prixHt): self
    {
        $this->prixHt = $prixHt;

        return $this;
    }

    public function getPrixTtc(): ?int
    {
        return $this->prixTtc;
    }

    public function setPrixTtc(?int $prixTtc): self
    {
        $this->prixTtc = $prixTtc;

        return $this;
    }

    public function getEtat(): ?Etats
    {
        return $this->etat;
    }

    public function setEtat(?Etats $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getClosedAt(): ?\DateTimeInterface
    {
        return $this->closedAt;
    }

    public function setClosedAt(?\DateTimeInterface $closedAt): self
    {
        $this->closedAt = $closedAt;

        return $this;
    }

    public function getSupprimer(): ?bool
    {
        return $this->supprimer;
    }

    public function setSupprimer(?bool $supprimer): self
    {
        $this->supprimer = $supprimer;

        return $this;
    }

    public function getDepartement(): ?Departements
    {
        return $this->departement;
    }

    public function setDepartement(?Departements $departement): self
    {
        $this->departement = $departement;

        return $this;
    }

    public function getNumBon(): ?string
    {
        return $this->numBon;
    }

    public function setNumBon(string $numBon): self
    {
        $this->numBon = $numBon;

        return $this;
    }
}
